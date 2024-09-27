import { ref, update, get, child } from "firebase/database";
import db from "./connect.js";

export async function getValue(endereco, excessao) {
    return await get(child(ref(db), `${endereco}`)).then((r) => { return r.val() || excessao });
}

export async function updateValue(path, data) {
    await update(ref(db, path), data);
    return { success: true };
}