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
* `g` to scroll all the way up
* `G` to scroll all the way down
* `backspace` to go back in history (thanks a lot to Google by the way for generously removing that for us!)
* `Shift + backspace` to go forward in history (yeah it's a little weird I know, but it makes sense maybe?)
* NO SMOOTH SCROLLING IT'S THE DEVIL

## Keyboard tab navigation

* `n` to switch to the next tab
* `p` to switch to the previous tab
* `q` to close the current tab

## Hinting

* `f` to bring up hints (keyboard shortcuts for all visible links on a page)
* all other `kbwarrior` shortcuts will be disabled for as long as hinting is on
* type a hint to navigate instantly to the hinted link
* hold shift to open the link in a new tab
* press `f`, `ESC` or `CTRL+[` again to cancel and remove the hints

## Inserting

* `i` to bring up insert hints (keyboard shortcuts for all visible text inputs and textareas)
* same as above but just for inserts

## Installation

Get it [from the webstore](https://chrome.google.com/webstore/detail/kbwarrior/apiogmmklkamhdnjjikooemepogmhjel)

You will have to reload any tab you want to use/test `kbwarrior` on.

## Development/Contributing

``` bash
git clone https://github.com/greg-js/kbwarrior
```

Then go to `chrome://extensions/` in chrome/chromium, enable `Developer mode`, click on `Load unpacked extension` and point it to wherever you cloned the repo.

Feel free to file issues or submit pull requests.

## Known issues

I've made sure none of these shortcuts will trigger when you're typing in an input field or anything, but there are some websites that provide their own keyboard shortcuts (GitHub and Twitter for example).

Those site-defined shortcuts will interfere with the ones provided by this extension. I wasn't sure how to deal with this, so I've elected to simply disable the extension on sites that make heavy use of such shortcuts. The current list where `kbwarrior` is disabled is:

* Facebook
* GitHub
* Reddit
* Twitter
* YouTube

I will probably update this list as I go along. Feel free to make a PR or open an issue if there are other sites this really doesn't work on.

## TODO

* ???
