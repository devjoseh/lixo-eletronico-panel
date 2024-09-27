import { ref, update, get, child } from "firebase/database";
import db from "./connect.js";

// export async function getValue(endereco, excessao) {
//     return await get(child(ref(db), `${endereco}`)).then((r) => { return r.val() || excessao });
// }

export async function getValue(endereco, excessao) {
    try {
        const snapshot = await get(child(ref(db), endereco));
        return snapshot.val() || excessao;
    } catch (error) {
        console.error('Erro ao obter dados do Firebase:', error);
        throw new Error('Erro ao acessar os dados');
    }
}

export async function updateValue(path, data) {
    await update(ref(db, path), data);
    return { success: true };
}