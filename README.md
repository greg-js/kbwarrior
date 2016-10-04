# kbwarrior

`kbwarrior` is a simple Chrome extension for people who like the idea of keyboard (or vim)-based web browsing, but for whom the existing extensions that provide such functionality either do too much or too little for their liking.

I aim to keep this simple, and am still not sure about the final feature set. For now though, this is what `kbwarrior` does:

## Page navigation

* `j` to scroll down a line
* `k` to scroll up a line
* `h` to scroll left (if applicable)
* `l` to scroll right (if applicable)
* `u` to scroll up half a page
* `d` to scroll down half a page
* `backspace` to go back in history (thanks a lot to Google by the way for generously removing that for us!)
* NO SMOOTH SCROLLING IT'S THE DEVIL

## Keyboard tab navigation

* `n` to switch to the next tab
* `p` to switch to the previous tab

## Hinting

* `f` to bring up hints (keyboard shortcuts for all visible links on a page)
* all other `kbwarrior` shortcuts will be disabled for as long as hinting is on
* type a hint to navigate instantly to the hinted link
* press `f` again to cancel and remove the hints

## Inserting

* `i` to bring up insert hints (keyboard shortcuts for all visible text inputs and textareas)
* same as above but just for inserts

## Installation

I will put this in the extensions webstore later when I feel it's ready, but in case you want to try it out now:

``` bash
git clone https://github.com/greg-js/kbwarrior
```

Then go to `chrome://extensions/` in chrome/chromium, enable `Developer mode`, click on `Load unpacked extension` and point it to wherever you cloned the repo.

You will have to reload any tab you want to use/test `kbwarrior` on.

## Known issues

I've made sure none of these shortcuts will trigger when you're typing in an input field or anything, but there are some websites that provide their own keyboard shortcuts (GitHub and Twitter for example).

Those site-defined shortcuts will interfere with the ones provided by this extension. I wasn't sure how to deal with this, so I've elected to simply disable the extension on sites that make heavy use of such shortcuts. The current list where `kbwarrior` is disabled is:

* Facebook
* GitHub
* Reddit
* Twitter

I will probably update this list as I go along. Feel free to make a PR or open an issue if there are other sites this really doesn't work on.

## TODO

* make a shortcut to go forward in history
* possibly make a `close tab` shortcut
* possibly use the shift modifier on hints to open them in a new window
