/**
 * Hierarchi
 * Version: 0.1.0
 * Author: Pongpanot Chantana
 * GitHub: https://github.com/munichPMN/AddressSelector/
 * Description: JavaScript Library for creating hierarchical dropdown menus.
 */

        var Hierarchi = (function () {
            class Select {
                constructor(options) {
                    this.data = options.data;
                    this.selectors = options.selectors;
                    this.placeholders = options.placeholders || [];
                    this.defaults = options.defaults || []; // New defaults parameter
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
                    selectElement.innerHTML = `<option value='' selected disabled>${placeholder || 'Select'}</option>`;
                    selectElement.disabled = false;
                    for (const key in data) {
                        if (data.hasOwnProperty(key)) {
                            const option = document.createElement("option");
                            option.value = key;
                            option.text = key;
                            selectElement.appendChild(option);
                        }
                    }
                }


                updateSelects(startIndex, selectedValue) {
                    const nextIndex = startIndex + 1;
                    if (nextIndex >= this.selectors.length) return;
                    for (let i = nextIndex; i < this.selectors.length; i++) {
                        const selectElement = document.querySelector(this.selectors[i]);
                        selectElement.innerHTML = `<option value='' selected disabled>${this.placeholders[i] || 'Select'}</option>`;
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
                            this.populateOptions(nextSelectElement, data, this.placeholders[nextIndex]);
                            if (nextSelectElement.value !== '') {
                                this.updateSelects(nextIndex, nextSelectElement.value); // Recursive call for further selects
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
                        nextSelectElement.innerHTML = `<option value='' selected disabled>${this.placeholders[nextIndex] || 'Select'}</option>`;
                    }
                }

                disableSelectsFromIndex(startIndex) {
                    const fselectElement = document.querySelector(this.selectors[0]);
                    if (typeof this.defaults[0] !== 'undefined' && this.defaults[0] !== '') {
                        for (var i = 0; i < fselectElement.options.length; i++) {
                            console.log(fselectElement)
                            if (fselectElement.options[i].value === this.defaults[0]) {
                                fselectElement.options[i].selected = true;
                                break;
                            }
                        }
                    }
                    for (let i = startIndex; i < this.selectors.length; i++) {
                        const selectElement = document.querySelector(this.selectors[i]);
                        selectElement.innerHTML = `<option value='' selected disabled>${this.placeholders[i] || 'Select'}</option>`;
                        if (typeof this.defaults[0] !== 'undefined' && this.defaults[0] !== '') {
                        selectElement.innerHTML = `<option value='${this.defaults[i]}' selected>${this.defaults[i]}</option>`;
                        }
                        selectElement.disabled = true;
                    }
                }
            }
            return {
                Select: Select
            };
        })();
