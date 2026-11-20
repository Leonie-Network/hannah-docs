# Signed firmware (own key)

The satellite firmware of an official release is signed. A satellite that runs such a
firmware only accepts updates signed with the same key (see
[Lieferkette](../manual/security/supply-chain.md) for how the project protects its key).
A firmware you build from the GitHub source is **not signed** and does not check anything.

If you want your own satellites to accept only firmware signed with a key **you** hold, you
can switch the check on for your own build. This page shows how.

!!! note "What it protects, and what not"
    The check applies to **updates**: the over-the-air update, and the firmware upload in
    the satellite's web UI. It does not protect against someone who holds the satellite and
    reflashes it over the UART header: there is no Secure Boot and nothing is burned into the
    chip's eFuses. A build without the check can always be flashed back over the cable.

## How it works

The build uses the ESP-IDF feature *signed app verification without hardware Secure Boot*
(Secure Boot V2, RSA-3072) and appends a signature block to the firmware image.

- The **trust anchor is the running firmware**: a satellite takes the public key from the
  signature block of the firmware it currently runs. A new image is accepted only if it is
  signed with that key.
- The check runs **when an update arrives**, not on every boot.
- Only the **first key** of the signature block counts. There is no key rotation: changing the
  key means flashing the satellite over the cable once.
- A firmware built with the check, but **without** a signature block, does not start (the
  firmware aborts early during startup and restarts in a loop). The first image you flash over
  the cable therefore has to be signed.

## What you need

- The `satellite-esp` folder of the [mono-repo](https://github.com/NurPech/hannah) and an
  ESP-IDF environment, as in [Getting Started](getting-started.md).
- A satellite you can reach over the UART header, for the first flash.

!!! warning "Official firmware and your key exclude each other"
    A satellite that runs an official signed release does not take your build over the air,
    and a satellite that trusts your key does not take official releases over the air. The
    first image with your key goes on over the cable, from then on the satellite trusts your
    key. To go back to the official releases, flash an official release over the cable once
    (or a build without the check).

## Steps

**1. Create a key** and keep it outside the repository. Back it up and keep it private.

```
espsecure generate-signing-key --version 2 --scheme rsa3072 my_signing_key.pem
```

**2. Tell the build where the key is.** Put the path into a small overlay file next to the
other `sdkconfig.defaults` files, for example `satellite-esp/sdkconfig.secure.local`. The
repository ignores a file with this name, so the path does not end up in a commit.

```
CONFIG_SECURE_BOOT_SIGNING_KEY="/path/to/my_signing_key.pem"
```

**3. Build with the signing overlay.** `sdkconfig.defaults.secure` switches the check on
(`CONFIG_SECURE_SIGNED_APPS_NO_SECURE_BOOT`, the RSA scheme, verification on update, signing
during the build). Merge it after the board file and your key overlay. A separate build folder
keeps this build apart from an unsigned one:

```
idf.py -B build-secure -DSDKCONFIG=build-secure/sdkconfig \
  -DSDKCONFIG_DEFAULTS="sdkconfig.defaults;sdkconfig.defaults.rev5;sdkconfig.defaults.secure;sdkconfig.secure.local" \
  build
```

Use the board file that matches your hardware (`rev5` or `devkit`). The result is
`build-secure/hannah_satellite.bin`, with the signature block appended. Next to it,
`hannah_satellite-unsigned.bin` is the same image without the block. The signed image is 4 KiB
larger than the unsigned one, and the image is padded to a multiple of 64 KiB before the block.
The build prints how much room is left in the 2 MiB app partition.

**4. Flash the first image over the cable.** It has to be the signed one:

```
idf.py -B build-secure -p PORT flash monitor
```

**5. Update later.** Every following image has to be built with the same key. A signed image is
accepted, an unsigned one or one signed with another key is rejected: the web UI answers with
HTTP 500 and the satellite logs `Secure boot signature verification failed`.

## If the key is not on your build machine

The signature can also be created afterwards, for example by a signing service. Build the
image padded but unsigned with `CONFIG_SECURE_BOOT_BUILD_SIGNED_BINARIES=n` added to your
overlay, then sign `hannah_satellite.bin` with `espsecure sign-data --version 2` (or with a
signature you calculated elsewhere, using `--pub-key` and `--signature`). The signed file
replaces `hannah_satellite.bin`. This is how the official release pipeline works: the key stays
in a service and the pipeline only gets the signature back.

## Pitfalls

- **Lost key:** there is no recovery and no rotation. Without the key you can only flash the
  satellite over the cable again.
- **Flashing a shorter image over a signed one** (for example with `esptool`) leaves the old
  signature block in the sector behind the new image, so the satellite still sees a valid block.
  When you test the unsigned case, erase that sector.
