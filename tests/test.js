// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import Locale from '../locale/pt_BR/locale';
// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Extenso API", () => {
    describe("GET /", () => {
        // Empty
        it("should get '400 - Not a valid number'", (done) => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.error.should.equal('Not a valid number');
                    done();
                });
        });
        // Number
        it("should get a string", (done) => {
            const number = '1';
            chai.request(app)
                .get(`/${number}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.extenso.should.be.a('string');
                    done();
                });
        });
        // More than 99999
        it("should get '400 - Out of range'", (done) => {
            const number = 100000;
            chai.request(app)
                .get(`/${number}`)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.error.should.equal('Out of range');
                    done();
                });
        });
        // Less than 99999
        it("should get '400 - Out of range'", (done) => {
            const number = -100000;
            chai.request(app)
                .get(`/${number}`)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.error.should.equal('Out of range');
                    done();
                });
        });
    });
});
describe("Locale pt_BR", () => {
    it("should get 'Not valid a number'", () => {
        const numbers = ['*', '7F', 'FA4', '&', 'A'];
        numbers.forEach((element) => {
            const extenso = new Locale().numberInWords(element);
            chai.expect(extenso.error).to.equals('Not a valid number');
        });
    });
    it("should get 'zero'", () => {
        const number = '0';
        const extenso = new Locale().numberInWords(number);
        chai.expect(extenso.value).to.equals('zero');
    });
    it("should get 'um'", () => {
        const number = '1';
        const extenso = new Locale().numberInWords(number);
        chai.expect(extenso.value).to.equals('um');
    });
    it("should get 'mil'", () => {
        const number = '1000';
        const extenso = new Locale().numberInWords(number);
        chai.expect(extenso.value).to.equals('mil');
    });
    it("should get 'dez mil'", () => {
        const number = '10000';
        const extenso = new Locale().numberInWords(number);
        chai.expect(extenso.value).to.equals('dez mil');
    });
    it("should get 'dez'", () => {
        const number = '10.000';
        const extenso = new Locale().numberInWords(number);
        chai.expect(extenso.value).to.equals('dez');
    });
    it("should get 'dez'", () => {
        const number = '10.000';
        const extenso = new Locale().numberInWords(number);
        chai.expect(extenso.value).to.equals('dez');
    });
    it("should get 'dez'", () => {
        const number = '00000010';
        const extenso = new Locale().numberInWords(number);
        chai.expect(extenso.value).to.equals('dez');
    });
    it("should get 'menos mil e quarenta e dois'", () => {
        const number = '-1042';
        const extenso = new Locale().numberInWords(number);
        chai.expect(extenso.value).to.equals('menos mil e quarenta e dois');
    });
    it("should get 'mil e quarenta'", () => {
        const number = '1040';
        const extenso = new Locale().numberInWords(number);
        chai.expect(extenso.value).to.equals('mil e quarenta');
    });
    it("should get 'noventa e quatro mil e quinhentos e oitenta e sete'", () => {
        const number = '94587';
        const extenso = new Locale().numberInWords(number);
        chai.expect(extenso.value).to.equals('noventa e quatro mil e quinhentos e oitenta e sete');
    });
    it("should get 'menos noventa e nove mil e novecentos e noventa e nove'", () => {
        const number = '-99999';
        const extenso = new Locale().numberInWords(number);
        chai.expect(extenso.value).to.equals('menos noventa e nove mil e novecentos e noventa e nove');
    });
    it("should get 'Out of range'", () => {
        const numbers = ['100000', '-100000', '000888899'];
        numbers.forEach((element) => {
            const extenso = new Locale().numberInWords(element);
            chai.expect(extenso.error).to.equals('Out of range');
        });
    });
});