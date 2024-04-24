function SET_NEW_LANGUAGE(params = {}) {
    let { state, action } = params;
    let { data: { languageKey, direction,  langIndex } } = action;
    let newState = JSON.parse(JSON.stringify(state))

    newState.params.language = languageKey
    newState.params.direction = direction
    newState.params.langIndex = langIndex
    return newState;
}

export default SET_NEW_LANGUAGE