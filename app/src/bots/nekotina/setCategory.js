module.exports = text => {

    text = text.toLowerCase()
    let result = null

    if (text.includes('enfadó')) result = 'angry'
    else if (text.includes('baka')) result = 'baka'
    else if (text.includes('dispara')) result = 'bang'
    else if (text.includes('muerde')) result = 'bite'
    else if (text.includes('despide')) result = 'bye'
    else if (text.includes('mejillas')) result = 'cheeks'
    else if (text.includes('aplaud')) result = 'claps'
    else if (text.includes('cocina')) result = 'cook'
    else if (text.includes('acurruc')) result = 'cuddle'

    return result

}