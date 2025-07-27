function gerarPassword(tamanho = 12) {
    if (tamanho < 4)
        throw new Error('A senha deve ter pelo menos 4 caracteres.')

    const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz'
    const numeros = '0123456789'
    const simbolos = '!@#$%^&*()_+[]{}<>?,./-='

    const tudo = letrasMaiusculas + letrasMinusculas + numeros + simbolos

    const obrigatorios = [
        letrasMaiusculas[Math.floor(Math.random() * letrasMaiusculas.length)],
        letrasMinusculas[Math.floor(Math.random() * letrasMinusculas.length)],
        numeros[Math.floor(Math.random() * numeros.length)],
        simbolos[Math.floor(Math.random() * simbolos.length)],
    ]

    for (let i = obrigatorios.length; i < tamanho; i++) {
        obrigatorios.push(tudo[Math.floor(Math.random() * tudo.length)])
    }

    // Embaralhamento corrigido
    for (let i = obrigatorios.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[obrigatorios[i], obrigatorios[j]] = [obrigatorios[j], obrigatorios[i]]
    }

    return obrigatorios.join('')
}

module.exports = gerarPassword
