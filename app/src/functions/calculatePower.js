module.exports = (stat, level, base) => {
    let value = (2 * base + stat.points + stat.effort_points / 4) * level / 100
    
    if (stat.key === 'hp') value += level + 10
    else value = (value + 5) * stat.nature

    return Math.round(value)
}