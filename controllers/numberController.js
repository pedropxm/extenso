import Locale from '../locale/pt_BR/locale';

class NumberController {
    /**
     * Return number in words (PT_BR)
     * @param {*} req Request
     * @param {*} res Response
     */
    static getNumberInWords(req, res) {
        let number = parseInt(Number(req.params.number), 10);
        let extenso = new Locale().numberInWords(number);

        if (extenso.hasOwnProperty('error')) {
            return res.status(400).json({ error: extenso.error });
        }

        return res.status(200).json({
            extenso: extenso.value
        });
    }
}
export default NumberController;