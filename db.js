// idedefine ko isa isa yan w8 lang

const add = (path) =>{
    db.collection(path).add(doc);
}

const get = (path) => {
  db.doc(path).get();
}

const remove = (path) => {
    db.doc(path).delete();
}

const update = (path) => {
    db.doc(path).update(doc);
}


const addToCart = (items) => {

}