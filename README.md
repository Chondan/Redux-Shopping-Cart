# Redux Shopping Cart

Go to application: https://chondan.github.io/Redux-Shopping-Cart

Components
- Navbar -> AppName, Shooping cart (show number of selected items)
- Item Lists 
	- Item
- Footer
	- Calculator
	- Clear cart button

## Tricks
- set currency format
```JavaScript
(2500).toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD',
}); /* $2,500.00 */
```