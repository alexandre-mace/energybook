let readTextFile = file => {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = () => {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                this.setState({
                    text: allText
                });
            }
        }
    };
    rawFile.send(null);
};

function csvToJson(csvFile){
    return readTextFile(require(csvFile))
}
export default csvToJson;