import _ from 'lodash'

export default (obj1, obj2) => {
    let obj1Clone = _.cloneDeep(obj1) //To prevent mutation
    return _.merge(obj1Clone, obj2)
}