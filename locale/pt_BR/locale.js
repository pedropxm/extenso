class Locale {
    constructor() {
        // Words dictionary
        this.number_dict = require('./dictionary.json');
        this.max_number = 99999;
        this.min_number = this.max_number * -1;
    }
    /**
     * Convert integers to words
     * @param {Number} number
     */
    numberInWords(number) {
        let sign = '';
        var filtered_number = parseInt(Number(number), 10);
        if (filtered_number !== filtered_number) { // not a number (NaN !== NaN => true)
            return { 'error': 'Not a valid number' };
        }
        if (Number(number) !== parseInt(number)) {
            return { 'error': 'Not a integer' };
        }
        if (filtered_number < this.min_number || filtered_number > this.max_number) {
            return { 'error': 'Out of range' };
        }
        if (filtered_number < 0) {
            sign = this.number_dict['-'] + ' ';
            filtered_number *= -1;
        }
        return { 'value': sign + this.positiveInWords(filtered_number) };
    }

    /**
     * Convert positive integers to words
     * @param {Number} number
     */
    positiveInWords(number) {
        let words = '';
        let thousands;
        let hundreds;
        let tens;
        let units;
        if (this.number_dict.hasOwnProperty(number.toString())) {
            if (number == 100) {
                words = this.number_dict['100u'];
            } else {
                words = this.number_dict[number.toString()];
            }
        } else if (number < 100) {
            tens = Math.floor(number / 10) * 10;
            units = number % 10;
            words = this.number_dict[tens.toString()];
            if (units !== 0) {
                words += ` e ${this.positiveInWords(units)}`;
            }
        } else if (number < 1000) {
            hundreds = Math.floor(number / 100) * 100;
            words = this.number_dict[hundreds];
            if (number - hundreds !== 0) {
                words += ` e ${this.positiveInWords(number - hundreds)}`;
            }
        } else if (number <= this.max_number) {
            thousands = Math.floor(number / 1000);
            if (thousands > 1) {
                words = `${this.positiveInWords(thousands)} `;
            }
            words += 'mil';
            if (number - thousands * 1000 !== 0) {
                words += ` e ${this.positiveInWords(number - thousands * 1000)}`;
            }
        }
        return words;
    }

}
export default Locale;