function formatNumber(num) {
    return num
        .toFixed(2)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
        .replace(/\.0+$/,'')
}
export default formatNumber;