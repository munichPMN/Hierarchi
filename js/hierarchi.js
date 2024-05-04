/**
 * Hierarchi
 * Version: 0.1.0
 * Author: Pongpanot Chantana
 * GitHub: https://github.com/munichPMN/Hierarchi/
 * Description: JavaScript Library for creating hierarchical dropdown menus.
 */

var Hierarchi = (function () {
  class Select {
    constructor(options) {
      this.data = options.data;
      this.selectors = options.selectors;
      this.placeholders = options.placeholders || [];
      this.defaults = options.defaults || [];
      this.isSort = options.sort;
      this.populateSelects();
      this.disableSelectsFromIndex(1);
    }

    populateSelects() {
      for (let i = 0; i < this.selectors.length; i++) {
        const selectElement = document.querySelector(this.selectors[i]);
        this.populateOptions(selectElement, this.data, this.placeholders[i]);
        selectElement.addEventListener("change", () => {
          this.updateSelects(i, selectElement.value);
        });
      }
    }

    populateOptions(selectElement, data, placeholder) {
      selectElement.innerHTML = `<option value='' selected disabled>${placeholder || "Select"}</option>`;
      selectElement.disabled = false;

      if (this.isSort) {
        const sortedKeys = Object.keys(data).sort((a, b) => a.localeCompare(b));
        sortedKeys.forEach((key) => {
          const option = document.createElement("option");
          option.value = key;
          option.text = key;
          selectElement.appendChild(option);
        });
      } else {
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const option = document.createElement("option");
            option.value = key;
            option.text = key;
            selectElement.appendChild(option);
          }
        }
      }
    }

    updateSelects(startIndex, selectedValue) {
      const nextIndex = startIndex + 1;
      if (nextIndex >= this.selectors.length) return;
      for (let i = nextIndex; i < this.selectors.length; i++) {
        const selectElement = document.querySelector(this.selectors[i]);
        selectElement.innerHTML = `<option value='' selected disabled>${this.placeholders[i] || "Select"}</option>`;
        selectElement.disabled = true;
      }
      const nextSelector = this.selectors[nextIndex];
      const nextSelectElement = document.querySelector(nextSelector);
      let data = this.data;
      for (let i = 0; i <= startIndex; i++) {
        data = data[document.querySelector(this.selectors[i]).value];
      }
      if (data) {
        if (typeof data === "object") {
          this.populateOptions(
            nextSelectElement,
            data,
            this.placeholders[nextIndex],
          );
          if (nextSelectElement.value !== "") {
            this.updateSelects(nextIndex, nextSelectElement.value);
          }
        } else {
          nextSelectElement.disabled = false;
          const option = document.createElement("option");
          option.value = data;
          option.text = data;
          nextSelectElement.appendChild(option);
          option.selected = true;
        }
      } else {
        nextSelectElement.innerHTML = `<option value='' selected disabled>${this.placeholders[nextIndex] || "Select"}</option>`;
      }
    }

    disableSelectsFromIndex(startIndex) {
      const fselectElement = document.querySelector(this.selectors[0]);
      if (typeof this.defaults[0] !== "undefined" && this.defaults[0] !== "") {
        for (var i = 0; i < fselectElement.options.length; i++) {
          if (fselectElement.options[i].value === this.defaults[0]) {
            fselectElement.options[i].selected = true;
            break;
          }
        }
      }
      for (let i = startIndex; i < this.selectors.length; i++) {
        const selectElement = document.querySelector(this.selectors[i]);
        selectElement.innerHTML = `<option value='' selected disabled>${this.placeholders[i] || "Select"}</option>`;
        if (
          typeof this.defaults[0] !== "undefined" &&
          this.defaults[0] !== ""
        ) {
          selectElement.innerHTML = `<option value='${this.defaults[i]}' selected>${this.defaults[i]}</option>`;
        }
        selectElement.disabled = true;
      }
    }
  }

  // For select2
  class Select2 {
    constructor(options) {
      this.data = options.data;
      this.selectors = options.selectors;
      this.placeholders = options.placeholders || [];
      this.defaults = options.defaults || [];
      this.isSort = options.sort;
      this.populateSelects();
      this.disableSelectsFromIndex(1);
    }

    populateSelects() {
      for (let i = 0; i < this.selectors.length; i++) {
        const selectElement = $(this.selectors[i]);
        this.populateOptions(selectElement, this.data, this.placeholders[i]);
        selectElement.on("change", () => {
          this.updateSelects(i, selectElement.val());
        });

        selectElement.select2();
      }
    }

    populateOptions(selectElement, data, placeholder) {
      selectElement.empty();
      selectElement.append(
        `<option value='' disabled selected>${placeholder || "Select"}</option>`,
      );

      if (this.isSort) {
        const sortedKeys = Object.keys(data).sort((a, b) => a.localeCompare(b));
        sortedKeys.forEach((key) => {
          selectElement.append(`<option value='${key}'>${key}</option>`);
        });
      } else {
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            selectElement.append(`<option value='${key}'>${key}</option>`);
          }
        }
      }
    }

    updateSelects(startIndex, selectedValue) {
      const nextIndex = startIndex + 1;
      if (nextIndex >= this.selectors.length) return;
      for (let i = nextIndex; i < this.selectors.length; i++) {
        const selectElement = $(this.selectors[i]);
        selectElement.empty();
        selectElement.append(
          `<option value='' disabled selected>${this.placeholders[i] || "Select"}</option>`,
        );
        selectElement.prop("disabled", true);
        selectElement.prop("selectedIndex", 0);
        selectElement.trigger("change.select2");
      }
      const nextSelector = this.selectors[nextIndex];
      const nextSelectElement = $(nextSelector);
      let data = this.data;
      for (let i = 0; i <= startIndex; i++) {
        data = data[$(this.selectors[i]).val()];
      }
      if (data) {
        if (typeof data === "object") {
          this.populateOptions(
            nextSelectElement,
            data,
            this.placeholders[nextIndex],
          );
          if (nextSelectElement.val() !== "") {
            this.updateSelects(nextIndex, nextSelectElement.val());
          }

          nextSelectElement.prop("disabled", false);
        } else {
          nextSelectElement.prop("disabled", false);
          nextSelectElement.append(`<option value='${data}'>${data}</option>`);
          nextSelectElement.val(data).trigger("change.select2");
        }
      } else {
        nextSelectElement.empty();
        nextSelectElement.append(
          `<option value='' disabled selected>${this.placeholders[nextIndex] || "Select"}</option>`,
        );
      }
    }

    disableSelectsFromIndex(startIndex) {
      const fselectElement = $(this.selectors[0]);
      if (typeof this.defaults[0] !== "undefined" && this.defaults[0] !== "") {
        fselectElement.val(this.defaults[0]).trigger("change.select2");
      }
      for (let i = startIndex; i < this.selectors.length; i++) {
        const selectElement = $(this.selectors[i]);
        selectElement.empty();
        selectElement.append(
          `<option value='' disabled selected>${this.placeholders[i] || "Select"}</option>`,
        );
        if (
          typeof this.defaults[0] !== "undefined" &&
          this.defaults[0] !== ""
        ) {
          selectElement.append(
            `<option value='${this.defaults[i]}' selected>${this.defaults[i]}</option>`,
          );
        }
        selectElement.prop("disabled", true);
        selectElement.trigger("change.select2");
        selectElement.select2({ disabled: true });
      }
    }
  }
  return {
    Select: Select,
    Select2: Select2,
  };
})();
