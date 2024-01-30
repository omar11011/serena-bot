module.exports = seconds => {

    let msg = ""
    let hour = Math.floor(seconds / 3600)
    let minute = Math.floor((seconds - (hour * 3600)) / 60)
    let second = seconds - (hour * 3600 )- (minute * 60)

    if (second > 0) msg = second + " segundos"
    if (minute > 0) msg = minute + " minutos " + msg
    if (hour > 0) msg = hour + " horas " + msg

    return msg

}