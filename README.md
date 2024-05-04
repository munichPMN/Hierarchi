# Hierarchi JS Library

Hierarchi is a JavaScript library for creating hierarchical dropdown menus. It provides an easy-to-use interface for building multi-level dropdowns based on provided data.

## ✨ Features

- **Hierarchical Dropdowns**\
  Create dropdown menus with multiple levels of hierarchy.
- **Customizable**\
  Easily customize placeholders, default values, and sorting options.
- **Supports Select2**\
  Seamlessly integrate with the Select2 library for enhanced dropdown functionality.

## 📦 Installation

You can include Hierarchi in your project by using a CDN or downloading the `hierarchi.js` file from the [GitHub repository](https://github.com/munichPMN/Hierarchi/).

```html
<script src="path/to/hierarchi.js"></script>
```

## 🚀 Usage

### Basic Usage

```javascript
var HierarchiExample = new Hierarchi.Select({
 ...
});
```

Example data for hierarchical dropdowns

```javascript
var DATA = {
  USA: {
    "New York": {
      Manhattan: {
        "Street 1": "123",
        "Street 2": "456",
      },
      Brooklyn: {
        "Street 1": "789",
        "Street 2": "012",
      },
    },
    California: {
      "Los Angeles": {
        "Street 1": "345",
        "Street 2": "678",
      },
      "San Francisco": {
        "Street 1": "901",
        "Street 2": "234",
      },
    },
  },
  Canada: {
    Ontario: {
      Toronto: {
        "Street 1": "567",
        "Street 2": "890",
      },
      Ottawa: {
        "Street 1": "123",
        "Street 2": "456",
      },
    },
    Quebec: {
      Montreal: {
        "Street 1": "789",
        "Street 2": "012",
      },
      "Quebec City": {
        "Street 1": "345",
        "Street 2": "678",
      },
    },
  },
};
```

Initialize Hierarchi

```javascript
var hierarchicalDropdown = new Hierarchi.Select({
  data: yourData,
  selectors: ["#country", "#state", "#city","#street"],
  placeholders: ["Country", "State", "City", "Street"],
  sort: true,
});
```

HTML `<select>` example

```html
<select id="country"></select>
<select id="state"></select>
<select id="city"></select>
<select id="street"></select>
```

### Select2 Integration

```javascript
var hierarchicalDropdown = new Hierarchi.Select2({
 ...
});
```

## 📖 API

### Constructor

* **data** Object containing hierarchical data.
* **selectors** Array of CSS selectors for dropdown elements.
* **placeholders** Array of placeholder texts for dropdowns (optional).
* **defaults** Array of default values for dropdowns (optional).
* **sort** Boolean indicating whether to sort options alphabetically (optional, default: `false`).

## 📄 License

This project is licensed under the MIT License

