import { ref, update, get, child, runTransaction } from "firebase/database";
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

export async function updateMultipleValues(path, operation, updates) {
    try {
        const result = await runTransaction(ref(db, path), (currentValues) => {
            if (currentValues === null) {
                currentValues = {};
            }

            for (const key in updates) {
                if (currentValues.hasOwnProperty(key)) {
                    if (operation === 'add') {
                        currentValues[key] = parseFloat(currentValues[key]) + parseFloat(updates[key]);
                    } else if (operation === 'sub') {
                        currentValues[key] = Math.max(parseFloat(currentValues[key]) - parseFloat(updates[key]), 0);
                    }
                } else {
                    currentValues[key] = parseFloat(updates[key]);
                }
            }

            return currentValues;
        });

        if (result.committed) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Ocorreu um erro ao tentar atualizar alguns valores no banco de dados', error);
        throw new Error('Ocorreu um erro ao tentar atualizar alguns valores no banco de dados');
    }
}