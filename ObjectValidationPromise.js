export class ObjectValidator{
    async DeepObjectComparison(req1, req2){
        return JSON.stringify(req1) === JSON.stringify(req2) ? 'String values are equal!' : await this.#RecursiveValidation(req1, req2, "root");
    }
    
    async #RecursiveValidation(r1, r2, parentKey){
        return new Promise(async (resolve, reject) => {
            let o = await this.#TakeLargerBreath(r1, r2)
            let diff = [];
            for (let [k,v] of Object.entries(o["larger"])){
                if (typeof v === 'object' && o["smaller"].includes(k)){
                diff.push(...await this.#RecursiveValidation(v, r2[k], k));
                }
                else if(!o["smaller"].includes(k)){
                    diff.push(`${k} is not present in the ${o["order"]} object. ${k}'s type is ${typeof v} in parent object ${parentKey}`)
                }
          
                else if(typeof v !== 'object' && o["smaller"].includes(k) &&
                    v != r2[k]
                ){
                    diff.push(`The value of ${k} is not equal in ${parentKey}.`)
                    let valueDiff = {[JSON.stringify(r1)]: JSON.stringify(r1), [JSON.stringify(r2)]: JSON.stringify(r2)};
                    diff.push(valueDiff);
                }   
            }
            resolve(diff);
        });
    }
    
    #TakeLargerBreath(r1, r2)
    {
        return new Promise((resolve,reject) => {
            if(!r1 || !r2){
                reject("Invalid arguments");
                // throw new Error("Invalid argument(s)");
            }
                let r1k = Object.keys(r1);
                let r2k = Object.keys(r2);
                if (r1k.length >= r2k.length){
                    resolve({"larger":r1, "smaller":Object.keys(r2), "order":"second"});
                }
                if (r1k.length <= r2k.length){
                    resolve({"larger":r2, "smaller":Object.keys(r1), "order":"first"});
                }
        })
    
    }
}
// let req1 = {"a": 1, "C": {"a": 2, "c": {"a": 2}}};
// let req2 = {"a": 2, "C": {"a": 1, "c": {"a": 1}}};
// console.log(JSON.stringify(await new ObjectValidator().DeepObjectComparison(req1, req2)))
