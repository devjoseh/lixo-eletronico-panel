import { ref, update, get, child } from "firebase/database";
import db from "./connect.js";

export async function getValue(endereco, excessao) {
    try {
        return await get(child(ref(db), `${endereco}`)).then((r) => { return r.val() || excessao })
    } catch (error) {
        console.error('Erro ao obter dados do Firebase:', error);
        throw new Error('Erro ao acessar os dados');
    }
}

export async function updateValue(path, data) {
    try {
        await update(ref(db, path), data);
        return { success: true };
    } catch (error) {
        console.error('Erro ao atualizar dados no Firebase:', error);
        throw new Error('Erro ao atualizar dados');
    }
}