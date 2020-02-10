# Copy to Clipboard

A chrome extension that helps you keep the things you're always copy and pasting handy

## Why

This exists because I was working on a project with 0 automation testing. I constantly had to copy, paste the same value, over and over again. I kept them handy with a sticky note, but wouldn't it be nice to click one button and have the thing you need copied? I thought so too.

## What

It's surprisingly straightforward to make a Chrome extension. I followed [this talk]() on getting started.

### Stack

The extension is a bundled Vue web app. The built artifact is around 100kb. I initially thought to just use vanilla JS, but handling state quickly became more annoying than it needed to be, so Vue was an easy choice.

The underlying storage is `chrome.storage.sync`. There is a local version, but why not sync across browsers?

## The Future

I'd like to eventually separate the stored copy / paste combos into categories. You can just cycle through the high level categories and choose stored combos from there.

