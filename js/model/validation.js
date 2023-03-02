function Validation() {
    this.checkEmpty = function (value, spanId, mess) {
        if (value === "" || value === 0) {
            getQry(spanId).style.display = "block";
            getQry(spanId).style.color = "red";
            getQry(spanId).innerHTML = mess;
            return false;
        }

        getQry(spanId).style.display = "none";
        getQry(spanId).innerHTML = "";
        return true;
    };
    this.checkPriceNumber = function (value, spanId, mess) {
        if (value === "" || isNaN(value)) {
            getQry(spanId).style.display = "block";
            getQry(spanId).style.color = "red";
            getQry(spanId).innerHTML = mess;
            return false;
        }

        getQry(spanId).style.display = "none";
        getQry(spanId).innerHTML = "";
        return true;
    };
    this.checkCharacterLength = function (value, spanId, mess, min, max) {
        if (min <= value.length && value.length <= max) {
            getQry(spanId).style.display = "none";
            getQry(spanId).innerHTML = "";
            return true;
        }

        getQry(spanId).style.color = "red";
        getQry(spanId).style.display = "block";
        getQry(spanId).innerHTML = mess;
        return false;
    };
   
}