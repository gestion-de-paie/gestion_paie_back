import { ModePaiement } from "src/mode_paiements/entities/mode_paiement.entity";
import { DataSource } from "typeorm";

export async function seedModePaiement(dataSource: DataSource){
    const repo = dataSource.getRepository(ModePaiement);

    const libelles = ["virement",'chèque','espèce','carte bancaire'];

    for(const libelle of libelles){
        const exists = await repo.findOneBy({libelle});
        if (!exists) {
            const mode = repo.create({libelle});
            await repo.save(mode);
        }
    }

}