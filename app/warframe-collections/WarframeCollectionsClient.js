'use client';

import { useState, useEffect, useCallback } from 'react';

// ─── Item Data ───────────────────────────────────────────────────────────────

const FRAMES = [
  { id: 'ash', name: 'Ash', category: 'warframe' },
  { id: 'ash_prime', name: 'Ash Prime', category: 'warframe', prime: true },
  { id: 'atlas', name: 'Atlas', category: 'warframe' },
  { id: 'atlas_prime', name: 'Atlas Prime', category: 'warframe', prime: true },
  { id: 'banshee', name: 'Banshee', category: 'warframe' },
  { id: 'banshee_prime', name: 'Banshee Prime', category: 'warframe', prime: true },
  { id: 'baruuk', name: 'Baruuk', category: 'warframe' },
  { id: 'baruuk_prime', name: 'Baruuk Prime', category: 'warframe', prime: true },
  { id: 'caliban', name: 'Caliban', category: 'warframe' },
  { id: 'caliban_prime', name: 'Caliban Prime', category: 'warframe', prime: true },
  { id: 'chroma', name: 'Chroma', category: 'warframe' },
  { id: 'chroma_prime', name: 'Chroma Prime', category: 'warframe', prime: true },
  { id: 'citrine', name: 'Citrine', category: 'warframe' },
  { id: 'cyte09', name: 'Cyte-09', category: 'warframe' },
  { id: 'dagath', name: 'Dagath', category: 'warframe' },
  { id: 'dante', name: 'Dante', category: 'warframe' },
  { id: 'ember', name: 'Ember', category: 'warframe' },
  { id: 'ember_prime', name: 'Ember Prime', category: 'warframe', prime: true },
  { id: 'equinox', name: 'Equinox', category: 'warframe' },
  { id: 'equinox_prime', name: 'Equinox Prime', category: 'warframe', prime: true },
  { id: 'excalibur', name: 'Excalibur', category: 'warframe' },
  { id: 'excalibur_umbra', name: 'Excalibur Umbra', category: 'warframe' },
  { id: 'follie', name: 'Follie', category: 'warframe' },
  { id: 'frost', name: 'Frost', category: 'warframe' },
  { id: 'frost_prime', name: 'Frost Prime', category: 'warframe', prime: true },
  { id: 'gara', name: 'Gara', category: 'warframe' },
  { id: 'gara_prime', name: 'Gara Prime', category: 'warframe', prime: true },
  { id: 'garuda', name: 'Garuda', category: 'warframe' },
  { id: 'garuda_prime', name: 'Garuda Prime', category: 'warframe', prime: true },
  { id: 'gauss', name: 'Gauss', category: 'warframe' },
  { id: 'gauss_prime', name: 'Gauss Prime', category: 'warframe', prime: true },
  { id: 'grendel', name: 'Grendel', category: 'warframe' },
  { id: 'grendel_prime', name: 'Grendel Prime', category: 'warframe', prime: true },
  { id: 'gyre', name: 'Gyre', category: 'warframe' },
  { id: 'gyre_prime', name: 'Gyre Prime', category: 'warframe', prime: true },
  { id: 'harrow', name: 'Harrow', category: 'warframe' },
  { id: 'harrow_prime', name: 'Harrow Prime', category: 'warframe', prime: true },
  { id: 'hildryn', name: 'Hildryn', category: 'warframe' },
  { id: 'hildryn_prime', name: 'Hildryn Prime', category: 'warframe', prime: true },
  { id: 'hydroid', name: 'Hydroid', category: 'warframe' },
  { id: 'hydroid_prime', name: 'Hydroid Prime', category: 'warframe', prime: true },
  { id: 'inaros', name: 'Inaros', category: 'warframe' },
  { id: 'inaros_prime', name: 'Inaros Prime', category: 'warframe', prime: true },
  { id: 'ivara', name: 'Ivara', category: 'warframe' },
  { id: 'ivara_prime', name: 'Ivara Prime', category: 'warframe', prime: true },
  { id: 'jade', name: 'Jade', category: 'warframe' },
  { id: 'khora', name: 'Khora', category: 'warframe' },
  { id: 'khora_prime', name: 'Khora Prime', category: 'warframe', prime: true },
  { id: 'koumei', name: 'Koumei', category: 'warframe' },
  { id: 'kullervo', name: 'Kullervo', category: 'warframe' },
  { id: 'lavos', name: 'Lavos', category: 'warframe' },
  { id: 'lavos_prime', name: 'Lavos Prime', category: 'warframe', prime: true },
  { id: 'limbo', name: 'Limbo', category: 'warframe' },
  { id: 'limbo_prime', name: 'Limbo Prime', category: 'warframe', prime: true },
  { id: 'loki', name: 'Loki', category: 'warframe' },
  { id: 'loki_prime', name: 'Loki Prime', category: 'warframe', prime: true },
  { id: 'mag', name: 'Mag', category: 'warframe' },
  { id: 'mag_prime', name: 'Mag Prime', category: 'warframe', prime: true },
  { id: 'mesa', name: 'Mesa', category: 'warframe' },
  { id: 'mesa_prime', name: 'Mesa Prime', category: 'warframe', prime: true },
  { id: 'mirage', name: 'Mirage', category: 'warframe' },
  { id: 'mirage_prime', name: 'Mirage Prime', category: 'warframe', prime: true },
  { id: 'nekros', name: 'Nekros', category: 'warframe' },
  { id: 'nekros_prime', name: 'Nekros Prime', category: 'warframe', prime: true },
  { id: 'nezha', name: 'Nezha', category: 'warframe' },
  { id: 'nezha_prime', name: 'Nezha Prime', category: 'warframe', prime: true },
  { id: 'nidus', name: 'Nidus', category: 'warframe' },
  { id: 'nidus_prime', name: 'Nidus Prime', category: 'warframe', prime: true },
  { id: 'nokko', name: 'Nokko', category: 'warframe' },
  { id: 'nova', name: 'Nova', category: 'warframe' },
  { id: 'nova_prime', name: 'Nova Prime', category: 'warframe', prime: true },
  { id: 'nyx', name: 'Nyx', category: 'warframe' },
  { id: 'nyx_prime', name: 'Nyx Prime', category: 'warframe', prime: true },
  { id: 'oberon', name: 'Oberon', category: 'warframe' },
  { id: 'oberon_prime', name: 'Oberon Prime', category: 'warframe', prime: true },
  { id: 'octavia', name: 'Octavia', category: 'warframe' },
  { id: 'octavia_prime', name: 'Octavia Prime', category: 'warframe', prime: true },
  { id: 'oraxia', name: 'Oraxia', category: 'warframe' },
  { id: 'protea', name: 'Protea', category: 'warframe' },
  { id: 'protea_prime', name: 'Protea Prime', category: 'warframe', prime: true },
  { id: 'qorvex', name: 'Qorvex', category: 'warframe' },
  { id: 'revenant', name: 'Revenant', category: 'warframe' },
  { id: 'revenant_prime', name: 'Revenant Prime', category: 'warframe', prime: true },
  { id: 'rhino', name: 'Rhino', category: 'warframe' },
  { id: 'rhino_prime', name: 'Rhino Prime', category: 'warframe', prime: true },
  { id: 'saryn', name: 'Saryn', category: 'warframe' },
  { id: 'saryn_prime', name: 'Saryn Prime', category: 'warframe', prime: true },
  { id: 'sevagoth', name: 'Sevagoth', category: 'warframe' },
  { id: 'sevagoth_prime', name: 'Sevagoth Prime', category: 'warframe', prime: true },
  { id: 'styanax', name: 'Styanax', category: 'warframe' },
  { id: 'temple', name: 'Temple', category: 'warframe' },
  { id: 'titania', name: 'Titania', category: 'warframe' },
  { id: 'titania_prime', name: 'Titania Prime', category: 'warframe', prime: true },
  { id: 'trinity', name: 'Trinity', category: 'warframe' },
  { id: 'trinity_prime', name: 'Trinity Prime', category: 'warframe', prime: true },
  { id: 'uriel', name: 'Uriel', category: 'warframe' },
  { id: 'valkyr', name: 'Valkyr', category: 'warframe' },
  { id: 'valkyr_prime', name: 'Valkyr Prime', category: 'warframe', prime: true },
  { id: 'vauban', name: 'Vauban', category: 'warframe' },
  { id: 'vauban_prime', name: 'Vauban Prime', category: 'warframe', prime: true },
  { id: 'volt', name: 'Volt', category: 'warframe' },
  { id: 'volt_prime', name: 'Volt Prime', category: 'warframe', prime: true },
  { id: 'voruna', name: 'Voruna', category: 'warframe' },
  { id: 'voruna_prime', name: 'Voruna Prime', category: 'warframe', prime: true },
  { id: 'wisp', name: 'Wisp', category: 'warframe' },
  { id: 'wisp_prime', name: 'Wisp Prime', category: 'warframe', prime: true },
  { id: 'wukong', name: 'Wukong', category: 'warframe' },
  { id: 'wukong_prime', name: 'Wukong Prime', category: 'warframe', prime: true },
  { id: 'xaku', name: 'Xaku', category: 'warframe' },
  { id: 'xaku_prime', name: 'Xaku Prime', category: 'warframe', prime: true },
  { id: 'yareli', name: 'Yareli', category: 'warframe' },
  { id: 'yareli_prime', name: 'Yareli Prime', category: 'warframe', prime: true },
  { id: 'zephyr', name: 'Zephyr', category: 'warframe' },
  { id: 'zephyr_prime', name: 'Zephyr Prime', category: 'warframe', prime: true },
];

const ARCHWINGS = [
  { id: 'amesha', name: 'Amesha', category: 'archwing' },
  { id: 'elytron', name: 'Elytron', category: 'archwing' },
  { id: 'itzal', name: 'Itzal', category: 'archwing' },
  { id: 'odonata', name: 'Odonata', category: 'archwing' },
  { id: 'odonata_prime', name: 'Odonata Prime', category: 'archwing', prime: true },
];

const NECRAMECHS = [
  { id: 'bonewidow', name: 'Bonewidow', category: 'necramech' },
  { id: 'voidrig', name: 'Voidrig', category: 'necramech' },
];

const WEAPONS = [
  { id: 'acceltra', name: "Acceltra", category: 'primary' },
  { id: 'acceltra_prime', name: "Acceltra Prime", category: 'primary', prime: true },
  { id: 'aeolak', name: "Aeolak", category: 'primary' },
  { id: 'afentis', name: "Afentis", category: 'primary' },
  { id: 'alternox', name: "Alternox", category: 'primary' },
  { id: 'alternox_prime', name: "Alternox Prime", category: 'primary', prime: true },
  { id: 'ambassador', name: "Ambassador", category: 'primary' },
  { id: 'amprex', name: "Amprex", category: 'primary' },
  { id: 'arca_plasmor', name: "Arca Plasmor", category: 'primary' },
  { id: 'argonak', name: "Argonak", category: 'primary' },
  { id: 'astilla', name: "Astilla", category: 'primary' },
  { id: 'astilla_prime', name: "Astilla Prime", category: 'primary', prime: true },
  { id: 'attica', name: "Attica", category: 'primary' },
  { id: 'ax_52', name: "Ax-52", category: 'primary' },
  { id: 'basmu', name: "Basmu", category: 'primary' },
  { id: 'battacor', name: "Battacor", category: 'primary' },
  { id: 'baza', name: "Baza", category: 'primary' },
  { id: 'baza_prime', name: "Baza Prime", category: 'primary', prime: true },
  { id: 'boar', name: "Boar", category: 'primary' },
  { id: 'boar_prime', name: "Boar Prime", category: 'primary', prime: true },
  { id: 'boltor', name: "Boltor", category: 'primary' },
  { id: 'boltor_prime', name: "Boltor Prime", category: 'primary', prime: true },
  { id: 'braton', name: "Braton", category: 'primary' },
  { id: 'braton_prime', name: "Braton Prime", category: 'primary', prime: true },
  { id: 'braton_vandal', name: "Braton Vandal", category: 'primary' },
  { id: 'bubonico', name: "Bubonico", category: 'primary' },
  { id: 'burston', name: "Burston", category: 'primary' },
  { id: 'burston_prime', name: "Burston Prime", category: 'primary', prime: true },
  { id: 'buzlok', name: "Buzlok", category: 'primary' },
  { id: 'carmine_penta', name: "Carmine Penta", category: 'primary' },
  { id: 'cedo', name: "Cedo", category: 'primary' },
  { id: 'cedo_prime', name: "Cedo Prime", category: 'primary', prime: true },
  { id: 'cernos', name: "Cernos", category: 'primary' },
  { id: 'cernos_prime', name: "Cernos Prime", category: 'primary', prime: true },
  { id: 'cinta', name: "Cinta", category: 'primary' },
  { id: 'coda_bassocyst', name: "Coda Bassocyst", category: 'primary' },
  { id: 'coda_bubonico', name: "Coda Bubonico", category: 'primary' },
  { id: 'coda_hema', name: "Coda Hema", category: 'primary' },
  { id: 'coda_sporothrix', name: "Coda Sporothrix", category: 'primary' },
  { id: 'coda_synapse', name: "Coda Synapse", category: 'primary' },
  { id: 'convectrix', name: "Convectrix", category: 'primary' },
  { id: 'corinth', name: "Corinth", category: 'primary' },
  { id: 'corinth_prime', name: "Corinth Prime", category: 'primary', prime: true },
  { id: 'daikyu', name: "Daikyu", category: 'primary' },
  { id: 'daikyu_prime', name: "Daikyu Prime", category: 'primary', prime: true },
  { id: 'dera', name: "Dera", category: 'primary' },
  { id: 'dera_vandal', name: "Dera Vandal", category: 'primary' },
  { id: 'dex_sybaris', name: "Dex Sybaris", category: 'primary' },
  { id: 'drakgoon', name: "Drakgoon", category: 'primary' },
  { id: 'dread', name: "Dread", category: 'primary' },
  { id: 'efv_5_jupiter', name: "Efv-5 Jupiter", category: 'primary' },
  { id: 'enkaus', name: "Enkaus", category: 'primary' },
  { id: 'evensong', name: "Evensong", category: 'primary' },
  { id: 'exergis', name: "Exergis", category: 'primary' },
  { id: 'felarx', name: "Felarx", category: 'primary' },
  { id: 'ferrox', name: "Ferrox", category: 'primary' },
  { id: 'flux_rifle', name: "Flux Rifle", category: 'primary' },
  { id: 'fulmin', name: "Fulmin", category: 'primary' },
  { id: 'fulmin_prime', name: "Fulmin Prime", category: 'primary', prime: true },
  { id: 'glaxion', name: "Glaxion", category: 'primary' },
  { id: 'glaxion_vandal', name: "Glaxion Vandal", category: 'primary' },
  { id: 'gorgon', name: "Gorgon", category: 'primary' },
  { id: 'gorgon_wraith', name: "Gorgon Wraith", category: 'primary' },
  { id: 'gotva_prime', name: "Gotva Prime", category: 'primary', prime: true },
  { id: 'grakata', name: "Grakata", category: 'primary' },
  { id: 'grinlok', name: "Grinlok", category: 'primary' },
  { id: 'harpak', name: "Harpak", category: 'primary' },
  { id: 'hek', name: "Hek", category: 'primary' },
  { id: 'hema', name: "Hema", category: 'primary' },
  { id: 'higasa', name: "Higasa", category: 'primary' },
  { id: 'hind', name: "Hind", category: 'primary' },
  { id: 'ignis', name: "Ignis", category: 'primary' },
  { id: 'ignis_wraith', name: "Ignis Wraith", category: 'primary' },
  { id: 'javlok', name: "Javlok", category: 'primary' },
  { id: 'karak', name: "Karak", category: 'primary' },
  { id: 'karak_wraith', name: "Karak Wraith", category: 'primary' },
  { id: 'kohm', name: "Kohm", category: 'primary' },
  { id: 'komorex', name: "Komorex", category: 'primary' },
  { id: 'kuva_bramma', name: "Kuva Bramma", category: 'primary' },
  { id: 'kuva_chakkhurr', name: "Kuva Chakkhurr", category: 'primary' },
  { id: 'kuva_drakgoon', name: "Kuva Drakgoon", category: 'primary' },
  { id: 'kuva_hek', name: "Kuva Hek", category: 'primary' },
  { id: 'kuva_hind', name: "Kuva Hind", category: 'primary' },
  { id: 'kuva_karak', name: "Kuva Karak", category: 'primary' },
  { id: 'kuva_kohm', name: "Kuva Kohm", category: 'primary' },
  { id: 'kuva_ogris', name: "Kuva Ogris", category: 'primary' },
  { id: 'kuva_quartakk', name: "Kuva Quartakk", category: 'primary' },
  { id: 'kuva_sobek', name: "Kuva Sobek", category: 'primary' },
  { id: 'kuva_tonkor', name: "Kuva Tonkor", category: 'primary' },
  { id: 'kuva_zarr', name: "Kuva Zarr", category: 'primary' },
  { id: 'lanka', name: "Lanka", category: 'primary' },
  { id: 'latron', name: "Latron", category: 'primary' },
  { id: 'latron_prime', name: "Latron Prime", category: 'primary', prime: true },
  { id: 'latron_wraith', name: "Latron Wraith", category: 'primary' },
  { id: 'lenz', name: "Lenz", category: 'primary' },
  { id: 'miter', name: "Miter", category: 'primary' },
  { id: 'mk1_braton', name: "Mk1-Braton", category: 'primary' },
  { id: 'mk1_paris', name: "Mk1-Paris", category: 'primary' },
  { id: 'mk1_strun', name: "Mk1-Strun", category: 'primary' },
  { id: 'mutalist_cernos', name: "Mutalist Cernos", category: 'primary' },
  { id: 'mutalist_quanta', name: "Mutalist Quanta", category: 'primary' },
  { id: 'nagantaka', name: "Nagantaka", category: 'primary' },
  { id: 'nagantaka_prime', name: "Nagantaka Prime", category: 'primary', prime: true },
  { id: 'nataruk', name: "Nataruk", category: 'primary' },
  { id: 'ogris', name: "Ogris", category: 'primary' },
  { id: 'opticor', name: "Opticor", category: 'primary' },
  { id: 'opticor_vandal', name: "Opticor Vandal", category: 'primary' },
  { id: 'panthera', name: "Panthera", category: 'primary' },
  { id: 'panthera_prime', name: "Panthera Prime", category: 'primary', prime: true },
  { id: 'paracyst', name: "Paracyst", category: 'primary' },
  { id: 'paris', name: "Paris", category: 'primary' },
  { id: 'paris_prime', name: "Paris Prime", category: 'primary', prime: true },
  { id: 'penta', name: "Penta", category: 'primary' },
  { id: 'perigale', name: "Perigale", category: 'primary' },
  { id: 'perigale_prime', name: "Perigale Prime", category: 'primary', prime: true },
  { id: 'phage', name: "Phage", category: 'primary' },
  { id: 'phantasma', name: "Phantasma", category: 'primary' },
  { id: 'phantasma_prime', name: "Phantasma Prime", category: 'primary', prime: true },
  { id: 'phenmor', name: "Phenmor", category: 'primary' },
  { id: 'prisma_gorgon', name: "Prisma Gorgon", category: 'primary' },
  { id: 'prisma_grakata', name: "Prisma Grakata", category: 'primary' },
  { id: 'prisma_grinlok', name: "Prisma Grinlok", category: 'primary' },
  { id: 'prisma_lenz', name: "Prisma Lenz", category: 'primary' },
  { id: 'prisma_tetra', name: "Prisma Tetra", category: 'primary' },
  { id: 'proboscis_cernos', name: "Proboscis Cernos", category: 'primary' },
  { id: 'purgator_1', name: "Purgator 1", category: 'primary' },
  { id: 'quanta', name: "Quanta", category: 'primary' },
  { id: 'quanta_vandal', name: "Quanta Vandal", category: 'primary' },
  { id: 'quartakk', name: "Quartakk", category: 'primary' },
  { id: 'quellor', name: "Quellor", category: 'primary' },
  { id: 'rakta_cernos', name: "Rakta Cernos", category: 'primary' },
  { id: 'rauta', name: "Rauta", category: 'primary' },
  { id: 'reconifex', name: "Reconifex", category: 'primary' },
  { id: 'rubico', name: "Rubico", category: 'primary' },
  { id: 'rubico_prime', name: "Rubico Prime", category: 'primary', prime: true },
  { id: 'sancti_tigris', name: "Sancti Tigris", category: 'primary' },
  { id: 'scourge', name: "Scourge", category: 'primary' },
  { id: 'scourge_prime', name: "Scourge Prime", category: 'primary', prime: true },
  { id: 'secura_penta', name: "Secura Penta", category: 'primary' },
  { id: 'shedu', name: "Shedu", category: 'primary' },
  { id: 'simulor', name: "Simulor", category: 'primary' },
  { id: 'sirocco', name: "Sirocco", category: 'primary' },
  { id: 'snipetron', name: "Snipetron", category: 'primary' },
  { id: 'snipetron_vandal', name: "Snipetron Vandal", category: 'primary' },
  { id: 'sobek', name: "Sobek", category: 'primary' },
  { id: 'soma', name: "Soma", category: 'primary' },
  { id: 'soma_prime', name: "Soma Prime", category: 'primary', prime: true },
  { id: 'sporothrix', name: "Sporothrix", category: 'primary' },
  { id: 'stahlta', name: "Stahlta", category: 'primary' },
  { id: 'steflos', name: "Steflos", category: 'primary' },
  { id: 'stradavar', name: "Stradavar", category: 'primary' },
  { id: 'stradavar_prime', name: "Stradavar Prime", category: 'primary', prime: true },
  { id: 'strun', name: "Strun", category: 'primary' },
  { id: 'strun_prime', name: "Strun Prime", category: 'primary', prime: true },
  { id: 'strun_wraith', name: "Strun Wraith", category: 'primary' },
  { id: 'supra', name: "Supra", category: 'primary' },
  { id: 'supra_vandal', name: "Supra Vandal", category: 'primary' },
  { id: 'sybaris', name: "Sybaris", category: 'primary' },
  { id: 'sybaris_prime', name: "Sybaris Prime", category: 'primary', prime: true },
  { id: 'synapse', name: "Synapse", category: 'primary' },
  { id: 'synoid_simulor', name: "Synoid Simulor", category: 'primary' },
  { id: 'telos_boltor', name: "Telos Boltor", category: 'primary' },
  { id: 'tenet_arca_plasmor', name: "Tenet Arca Plasmor", category: 'primary' },
  { id: 'tenet_envoy', name: "Tenet Envoy", category: 'primary' },
  { id: 'tenet_ferrox', name: "Tenet Ferrox", category: 'primary' },
  { id: 'tenet_flux_rifle', name: "Tenet Flux Rifle", category: 'primary' },
  { id: 'tenet_glaxion', name: "Tenet Glaxion", category: 'primary' },
  { id: 'tenet_quanta', name: "Tenet Quanta", category: 'primary' },
  { id: 'tenet_tetra', name: "Tenet Tetra", category: 'primary' },
  { id: 'tenora', name: "Tenora", category: 'primary' },
  { id: 'tenora_prime', name: "Tenora Prime", category: 'primary', prime: true },
  { id: 'tetra', name: "Tetra", category: 'primary' },
  { id: 'thornbak', name: "Thornbak", category: 'primary' },
  { id: 'tiberon', name: "Tiberon", category: 'primary' },
  { id: 'tiberon_prime', name: "Tiberon Prime", category: 'primary', prime: true },
  { id: 'tigris', name: "Tigris", category: 'primary' },
  { id: 'tigris_prime', name: "Tigris Prime", category: 'primary', prime: true },
  { id: 'tonkor', name: "Tonkor", category: 'primary' },
  { id: 'torid', name: "Torid", category: 'primary' },
  { id: 'trumna', name: "Trumna", category: 'primary' },
  { id: 'trumna_prime', name: "Trumna Prime", category: 'primary', prime: true },
  { id: 'vadarya_prime', name: "Vadarya Prime", category: 'primary', prime: true },
  { id: 'vaykor_hek', name: "Vaykor Hek", category: 'primary' },
  { id: 'vectis', name: "Vectis", category: 'primary' },
  { id: 'vectis_prime', name: "Vectis Prime", category: 'primary', prime: true },
  { id: 'veldt', name: "Veldt", category: 'primary' },
  { id: 'vinquibus', name: "Vinquibus", category: 'primary' },
  { id: 'vulkar', name: "Vulkar", category: 'primary' },
  { id: 'vulkar_wraith', name: "Vulkar Wraith", category: 'primary' },
  { id: 'zarr', name: "Zarr", category: 'primary' },
  { id: 'zenith', name: "Zenith", category: 'primary' },
  { id: 'zhuge', name: "Zhuge", category: 'primary' },
  { id: 'zhuge_prime', name: "Zhuge Prime", category: 'primary', prime: true },
  { id: 'acrid', name: "Acrid", category: 'secondary' },
  { id: 'aegrit', name: "Aegrit", category: 'secondary' },
  { id: 'afuris', name: "Afuris", category: 'secondary' },
  { id: 'afuris_prime', name: "Afuris Prime", category: 'secondary', prime: true },
  { id: 'akarius', name: "Akarius", category: 'secondary' },
  { id: 'akarius_prime', name: "Akarius Prime", category: 'secondary', prime: true },
  { id: 'akbolto', name: "Akbolto", category: 'secondary' },
  { id: 'akbolto_prime', name: "Akbolto Prime", category: 'secondary', prime: true },
  { id: 'akbronco', name: "Akbronco", category: 'secondary' },
  { id: 'akbronco_prime', name: "Akbronco Prime", category: 'secondary', prime: true },
  { id: 'akjagara', name: "Akjagara", category: 'secondary' },
  { id: 'akjagara_prime', name: "Akjagara Prime", category: 'secondary', prime: true },
  { id: 'aklato', name: "Aklato", category: 'secondary' },
  { id: 'aklex', name: "Aklex", category: 'secondary' },
  { id: 'aklex_prime', name: "Aklex Prime", category: 'secondary', prime: true },
  { id: 'akmagnus', name: "Akmagnus", category: 'secondary' },
  { id: 'akmagnus_prime', name: "Akmagnus Prime", category: 'secondary', prime: true },
  { id: 'aksomati', name: "Aksomati", category: 'secondary' },
  { id: 'aksomati_prime', name: "Aksomati Prime", category: 'secondary', prime: true },
  { id: 'akstiletto', name: "Akstiletto", category: 'secondary' },
  { id: 'akstiletto_prime', name: "Akstiletto Prime", category: 'secondary', prime: true },
  { id: 'akvasto', name: "Akvasto", category: 'secondary' },
  { id: 'akvasto_prime', name: "Akvasto Prime", category: 'secondary', prime: true },
  { id: 'akzani', name: "Akzani", category: 'secondary' },
  { id: 'angstrum', name: "Angstrum", category: 'secondary' },
  { id: 'arca_scisco', name: "Arca Scisco", category: 'secondary' },
  { id: 'athodai', name: "Athodai", category: 'secondary' },
  { id: 'atomos', name: "Atomos", category: 'secondary' },
  { id: 'azima', name: "Azima", category: 'secondary' },
  { id: 'ballistica', name: "Ballistica", category: 'secondary' },
  { id: 'ballistica_prime', name: "Ballistica Prime", category: 'secondary', prime: true },
  { id: 'bolto', name: "Bolto", category: 'secondary' },
  { id: 'brakk', name: "Brakk", category: 'secondary' },
  { id: 'bronco', name: "Bronco", category: 'secondary' },
  { id: 'bronco_prime', name: "Bronco Prime", category: 'secondary', prime: true },
  { id: 'cantare', name: "Cantare", category: 'secondary' },
  { id: 'castanas', name: "Castanas", category: 'secondary' },
  { id: 'catabolyst', name: "Catabolyst", category: 'secondary' },
  { id: 'cestra', name: "Cestra", category: 'secondary' },
  { id: 'coda_catabolyst', name: "Coda Catabolyst", category: 'secondary' },
  { id: 'coda_pox', name: "Coda Pox", category: 'secondary' },
  { id: 'coda_tysis', name: "Coda Tysis", category: 'secondary' },
  { id: 'cyanex', name: "Cyanex", category: 'secondary' },
  { id: 'cycron', name: "Cycron", category: 'secondary' },
  { id: 'despair', name: "Despair", category: 'secondary' },
  { id: 'detron', name: "Detron", category: 'secondary' },
  { id: 'dex_furis', name: "Dex Furis", category: 'secondary' },
  { id: 'dual_cestra', name: "Dual Cestra", category: 'secondary' },
  { id: 'dual_coda_torxica', name: "Dual Coda Torxica", category: 'secondary' },
  { id: 'dual_toxocyst', name: "Dual Toxocyst", category: 'secondary' },
  { id: 'efv_8_mars', name: "Efv-8 Mars", category: 'secondary' },
  { id: 'embolist', name: "Embolist", category: 'secondary' },
  { id: 'epitaph', name: "Epitaph", category: 'secondary' },
  { id: 'epitaph_prime', name: "Epitaph Prime", category: 'secondary', prime: true },
  { id: 'euphona_prime', name: "Euphona Prime", category: 'secondary', prime: true },
  { id: 'furis', name: "Furis", category: 'secondary' },
  { id: 'fusilai', name: "Fusilai", category: 'secondary' },
  { id: 'gammacor', name: "Gammacor", category: 'secondary' },
  { id: 'grimoire', name: "Grimoire", category: 'secondary' },
  { id: 'grimoire_secondary', name: "Grimoire", category: 'secondary' },
  { id: 'hikou', name: "Hikou", category: 'secondary' },
  { id: 'hikou_prime', name: "Hikou Prime", category: 'secondary', prime: true },
  { id: 'hystrix', name: "Hystrix", category: 'secondary' },
  { id: 'hystrix_prime', name: "Hystrix Prime", category: 'secondary', prime: true },
  { id: 'knell', name: "Knell", category: 'secondary' },
  { id: 'knell_prime', name: "Knell Prime", category: 'secondary', prime: true },
  { id: 'kohmak', name: "Kohmak", category: 'secondary' },
  { id: 'kompressa', name: "Kompressa", category: 'secondary' },
  { id: 'kompressa_prime', name: "Kompressa Prime", category: 'secondary', prime: true },
  { id: 'kraken', name: "Kraken", category: 'secondary' },
  { id: 'kulstar', name: "Kulstar", category: 'secondary' },
  { id: 'kunai', name: "Kunai", category: 'secondary' },
  { id: 'kuva_brakk', name: "Kuva Brakk", category: 'secondary' },
  { id: 'kuva_kraken', name: "Kuva Kraken", category: 'secondary' },
  { id: 'kuva_nukor', name: "Kuva Nukor", category: 'secondary' },
  { id: 'kuva_seer', name: "Kuva Seer", category: 'secondary' },
  { id: 'kuva_twin_stubbas', name: "Kuva Twin Stubbas", category: 'secondary' },
  { id: 'laetum', name: "Laetum", category: 'secondary' },
  { id: 'lato', name: "Lato", category: 'secondary' },
  { id: 'lato_prime', name: "Lato Prime", category: 'secondary', prime: true },
  { id: 'lato_vandal', name: "Lato Vandal", category: 'secondary' },
  { id: 'lex', name: "Lex", category: 'secondary' },
  { id: 'lex_prime', name: "Lex Prime", category: 'secondary', prime: true },
  { id: 'magnus', name: "Magnus", category: 'secondary' },
  { id: 'magnus_prime', name: "Magnus Prime", category: 'secondary', prime: true },
  { id: 'mara_detron', name: "Mara Detron", category: 'secondary' },
  { id: 'marelok', name: "Marelok", category: 'secondary' },
  { id: 'mk1_furis', name: "Mk1-Furis", category: 'secondary' },
  { id: 'mk1_kunai', name: "Mk1-Kunai", category: 'secondary' },
  { id: 'nukor', name: "Nukor", category: 'secondary' },
  { id: 'ocucor', name: "Ocucor", category: 'secondary' },
  { id: 'onos', name: "Onos", category: 'secondary' },
  { id: 'pandero', name: "Pandero", category: 'secondary' },
  { id: 'pandero_prime', name: "Pandero Prime", category: 'secondary', prime: true },
  { id: 'plinx', name: "Plinx", category: 'secondary' },
  { id: 'pox', name: "Pox", category: 'secondary' },
  { id: 'prisma_angstrum', name: "Prisma Angstrum", category: 'secondary' },
  { id: 'prisma_twin_gremlins', name: "Prisma Twin Gremlins", category: 'secondary' },
  { id: 'pyrana', name: "Pyrana", category: 'secondary' },
  { id: 'pyrana_prime', name: "Pyrana Prime", category: 'secondary', prime: true },
  { id: 'quatz', name: "Quatz", category: 'secondary' },
  { id: 'rakta_ballistica', name: "Rakta Ballistica", category: 'secondary' },
  { id: 'riot_848', name: "Riot-848", category: 'secondary' },
  { id: 'sagek_prime', name: "Sagek Prime", category: 'secondary', prime: true },
  { id: 'sancti_castanas', name: "Sancti Castanas", category: 'secondary' },
  { id: 'scyotid', name: "Scyotid", category: 'secondary' },
  { id: 'secura_dual_cestra', name: "Secura Dual Cestra", category: 'secondary' },
  { id: 'seer', name: "Seer", category: 'secondary' },
  { id: 'sepulcrum', name: "Sepulcrum", category: 'secondary' },
  { id: 'sicarus', name: "Sicarus", category: 'secondary' },
  { id: 'sicarus_prime', name: "Sicarus Prime", category: 'secondary', prime: true },
  { id: 'sonicor', name: "Sonicor", category: 'secondary' },
  { id: 'spectra', name: "Spectra", category: 'secondary' },
  { id: 'spectra_vandal', name: "Spectra Vandal", category: 'secondary' },
  { id: 'spira', name: "Spira", category: 'secondary' },
  { id: 'spira_prime', name: "Spira Prime", category: 'secondary', prime: true },
  { id: 'staticor', name: "Staticor", category: 'secondary' },
  { id: 'stubba', name: "Stubba", category: 'secondary' },
  { id: 'stug', name: "Stug", category: 'secondary' },
  { id: 'synoid_gammacor', name: "Synoid Gammacor", category: 'secondary' },
  { id: 'talons', name: "Talons", category: 'secondary' },
  { id: 'telos_akbolto', name: "Telos Akbolto", category: 'secondary' },
  { id: 'tenet_cycron', name: "Tenet Cycron", category: 'secondary' },
  { id: 'tenet_detron', name: "Tenet Detron", category: 'secondary' },
  { id: 'tenet_diplos', name: "Tenet Diplos", category: 'secondary' },
  { id: 'tenet_plinx', name: "Tenet Plinx", category: 'secondary' },
  { id: 'tenet_spirex', name: "Tenet Spirex", category: 'secondary' },
  { id: 'twin_grakatas', name: "Twin Grakatas", category: 'secondary' },
  { id: 'twin_gremlins', name: "Twin Gremlins", category: 'secondary' },
  { id: 'twin_kohmak', name: "Twin Kohmak", category: 'secondary' },
  { id: 'twin_rogga', name: "Twin Rogga", category: 'secondary' },
  { id: 'twin_vipers', name: "Twin Vipers", category: 'secondary' },
  { id: 'twin_vipers_wraith', name: "Twin Vipers Wraith", category: 'secondary' },
  { id: 'tysis', name: "Tysis", category: 'secondary' },
  { id: 'vasto', name: "Vasto", category: 'secondary' },
  { id: 'vasto_prime', name: "Vasto Prime", category: 'secondary', prime: true },
  { id: 'vaykor_marelok', name: "Vaykor Marelok", category: 'secondary' },
  { id: 'velox', name: "Velox", category: 'secondary' },
  { id: 'velox_prime', name: "Velox Prime", category: 'secondary', prime: true },
  { id: 'vesper_77', name: "Vesper 77", category: 'secondary' },
  { id: 'viper', name: "Viper", category: 'secondary' },
  { id: 'viper_wraith', name: "Viper Wraith", category: 'secondary' },
  { id: 'zakti', name: "Zakti", category: 'secondary' },
  { id: 'zakti_prime', name: "Zakti Prime", category: 'secondary', prime: true },
  { id: 'zylok', name: "Zylok", category: 'secondary' },
  { id: 'zylok_prime', name: "Zylok Prime", category: 'secondary', prime: true },
  { id: 'zymos', name: "Zymos", category: 'secondary' },
  { id: 'ack_and_brunt', name: "Ack & Brunt", category: 'melee' },
  { id: 'amanata', name: "Amanata", category: 'melee' },
  { id: 'amphis', name: "Amphis", category: 'melee' },
  { id: 'anku', name: "Anku", category: 'melee' },
  { id: 'ankyros', name: "Ankyros", category: 'melee' },
  { id: 'ankyros_prime', name: "Ankyros Prime", category: 'melee', prime: true },
  { id: 'arca_titron', name: "Arca Titron", category: 'melee' },
  { id: 'argo_and_vel', name: "Argo & Vel", category: 'melee' },
  { id: 'arum_spinosa', name: "Arum Spinosa", category: 'melee' },
  { id: 'atterax', name: "Atterax", category: 'melee' },
  { id: 'azothane', name: "Azothane", category: 'melee' },
  { id: 'balla', name: "Balla", category: 'melee' },
  { id: 'balla_melee', name: "Balla", category: 'melee' },
  { id: 'bo', name: "Bo", category: 'melee' },
  { id: 'bo_prime', name: "Bo Prime", category: 'melee', prime: true },
  { id: 'boltace', name: "Boltace", category: 'melee' },
  { id: 'broken_scepter', name: "Broken Scepter", category: 'melee' },
  { id: 'broken_war', name: "Broken War", category: 'melee' },
  { id: 'cadus', name: "Cadus", category: 'melee' },
  { id: 'cassowar', name: "Cassowar", category: 'melee' },
  { id: 'caustacyst', name: "Caustacyst", category: 'melee' },
  { id: 'ceramic_dagger', name: "Ceramic Dagger", category: 'melee' },
  { id: 'cerata', name: "Cerata", category: 'melee' },
  { id: 'ceti_lacera', name: "Ceti Lacera", category: 'melee' },
  { id: 'cobra_and_crane', name: "Cobra & Crane", category: 'melee' },
  { id: 'cobra_and_crane_prime', name: "Cobra & Crane Prime", category: 'melee', prime: true },
  { id: 'coda_caustacyst', name: "Coda Caustacyst", category: 'melee' },
  { id: 'coda_hirudo', name: "Coda Hirudo", category: 'melee' },
  { id: 'coda_mire', name: "Coda Mire", category: 'melee' },
  { id: 'coda_motovore', name: "Coda Motovore", category: 'melee' },
  { id: 'coda_pathocyst', name: "Coda Pathocyst", category: 'melee' },
  { id: 'corufell', name: "Corufell", category: 'melee' },
  { id: 'cronus', name: "Cronus", category: 'melee' },
  { id: 'cyath', name: "Cyath", category: 'melee' },
  { id: 'cyath_melee', name: "Cyath", category: 'melee' },
  { id: 'dakra_prime', name: "Dakra Prime", category: 'melee', prime: true },
  { id: 'dark_dagger', name: "Dark Dagger", category: 'melee' },
  { id: 'dark_split_sword', name: "Dark Split-Sword", category: 'melee' },
  { id: 'dark_sword', name: "Dark Sword", category: 'melee' },
  { id: 'dehtat', name: "Dehtat", category: 'melee' },
  { id: 'dehtat_melee', name: "Dehtat", category: 'melee' },
  { id: 'destreza', name: "Destreza", category: 'melee' },
  { id: 'destreza_prime', name: "Destreza Prime", category: 'melee', prime: true },
  { id: 'dex_dakra', name: "Dex Dakra", category: 'melee' },
  { id: 'dex_nikana', name: "Dex Nikana", category: 'melee' },
  { id: 'dokrahm', name: "Dokrahm", category: 'melee' },
  { id: 'dorrclave', name: "Dorrclave", category: 'melee' },
  { id: 'dragon_nikana', name: "Dragon Nikana", category: 'melee' },
  { id: 'dual_cleavers', name: "Dual Cleavers", category: 'melee' },
  { id: 'dual_ether', name: "Dual Ether", category: 'melee' },
  { id: 'dual_heat_swords', name: "Dual Heat Swords", category: 'melee' },
  { id: 'dual_ichor', name: "Dual Ichor", category: 'melee' },
  { id: 'dual_kamas', name: "Dual Kamas", category: 'melee' },
  { id: 'dual_kamas_prime', name: "Dual Kamas Prime", category: 'melee', prime: true },
  { id: 'dual_keres', name: "Dual Keres", category: 'melee' },
  { id: 'dual_keres_prime', name: "Dual Keres Prime", category: 'melee', prime: true },
  { id: 'dual_raza', name: "Dual Raza", category: 'melee' },
  { id: 'dual_skana', name: "Dual Skana", category: 'melee' },
  { id: 'dual_viciss', name: "Dual Viciss", category: 'melee' },
  { id: 'dual_zoren', name: "Dual Zoren", category: 'melee' },
  { id: 'dual_zoren_prime', name: "Dual Zoren Prime", category: 'melee', prime: true },
  { id: 'edun', name: "Edun", category: 'melee' },
  { id: 'ekhein', name: "Ekhein", category: 'melee' },
  { id: 'ekwana_ii_jai', name: "Ekwana Ii Jai", category: 'melee' },
  { id: 'ekwana_ii_ruhang', name: "Ekwana Ii Ruhang", category: 'melee' },
  { id: 'ekwana_jai', name: "Ekwana Jai", category: 'melee' },
  { id: 'ekwana_jai_ii', name: "Ekwana Jai Ii", category: 'melee' },
  { id: 'ekwana_ruhang', name: "Ekwana Ruhang", category: 'melee' },
  { id: 'ekwana_ruhang_ii', name: "Ekwana Ruhang Ii", category: 'melee' },
  { id: 'endura', name: "Endura", category: 'melee' },
  { id: 'ether_daggers', name: "Ether Daggers", category: 'melee' },
  { id: 'ether_reaper', name: "Ether Reaper", category: 'melee' },
  { id: 'ether_sword', name: "Ether Sword", category: 'melee' },
  { id: 'falcor', name: "Falcor", category: 'melee' },
  { id: 'fang', name: "Fang", category: 'melee' },
  { id: 'fang_prime', name: "Fang Prime", category: 'melee', prime: true },
  { id: 'fragor', name: "Fragor", category: 'melee' },
  { id: 'fragor_prime', name: "Fragor Prime", category: 'melee', prime: true },
  { id: 'furax', name: "Furax", category: 'melee' },
  { id: 'furax_wraith', name: "Furax Wraith", category: 'melee' },
  { id: 'galariak_prime', name: "Galariak Prime", category: 'melee', prime: true },
  { id: 'galatine', name: "Galatine", category: 'melee' },
  { id: 'galatine_prime', name: "Galatine Prime", category: 'melee', prime: true },
  { id: 'galvacord', name: "Galvacord", category: 'melee' },
  { id: 'gazal_machete', name: "Gazal Machete", category: 'melee' },
  { id: 'ghoulsaw', name: "Ghoulsaw", category: 'melee' },
  { id: 'glaive', name: "Glaive", category: 'melee' },
  { id: 'glaive_prime', name: "Glaive Prime", category: 'melee', prime: true },
  { id: 'gram', name: "Gram", category: 'melee' },
  { id: 'gram_prime', name: "Gram Prime", category: 'melee', prime: true },
  { id: 'guandao', name: "Guandao", category: 'melee' },
  { id: 'guandao_prime', name: "Guandao Prime", category: 'melee', prime: true },
  { id: 'gunsen', name: "Gunsen", category: 'melee' },
  { id: 'gunsen_prime', name: "Gunsen Prime", category: 'melee', prime: true },
  { id: 'halikar', name: "Halikar", category: 'melee' },
  { id: 'halikar_wraith', name: "Halikar Wraith", category: 'melee' },
  { id: 'harmony', name: "Harmony", category: 'melee' },
  { id: 'hate', name: "Hate", category: 'melee' },
  { id: 'heat_dagger', name: "Heat Dagger", category: 'melee' },
  { id: 'heat_sword', name: "Heat Sword", category: 'melee' },
  { id: 'heliocor', name: "Heliocor", category: 'melee' },
  { id: 'hespar', name: "Hespar", category: 'melee' },
  { id: 'hirudo', name: "Hirudo", category: 'melee' },
  { id: 'innodem', name: "Innodem", category: 'melee' },
  { id: 'jai', name: "Jai", category: 'melee' },
  { id: 'jai_ii', name: "Jai Ii", category: 'melee' },
  { id: 'jat_kittag', name: "Jat Kittag", category: 'melee' },
  { id: 'jat_kusar', name: "Jat Kusar", category: 'melee' },
  { id: 'jaw_sword', name: "Jaw Sword", category: 'melee' },
  { id: 'jayap', name: "Jayap", category: 'melee' },
  { id: 'kama', name: "Kama", category: 'melee' },
  { id: 'karyst', name: "Karyst", category: 'melee' },
  { id: 'karyst_prime', name: "Karyst Prime", category: 'melee', prime: true },
  { id: 'keratinos', name: "Keratinos", category: 'melee' },
  { id: 'kesheg', name: "Kesheg", category: 'melee' },
  { id: 'kestrel', name: "Kestrel", category: 'melee' },
  { id: 'kestrel_prime', name: "Kestrel Prime", category: 'melee', prime: true },
  { id: 'kogake', name: "Kogake", category: 'melee' },
  { id: 'kogake_prime', name: "Kogake Prime", category: 'melee', prime: true },
  { id: 'korb', name: "Korb", category: 'melee' },
  { id: 'korrudo', name: "Korrudo", category: 'melee' },
  { id: 'korumm', name: "Korumm", category: 'melee' },
  { id: 'kreska', name: "Kreska", category: 'melee' },
  { id: 'krohkur', name: "Krohkur", category: 'melee' },
  { id: 'kronen', name: "Kronen", category: 'melee' },
  { id: 'kronen_prime', name: "Kronen Prime", category: 'melee', prime: true },
  { id: 'kronsh', name: "Kronsh", category: 'melee' },
  { id: 'kronsh_melee', name: "Kronsh", category: 'melee' },
  { id: 'kroostra', name: "Kroostra", category: 'melee' },
  { id: 'kuva_ghoulsaw', name: "Kuva Ghoulsaw", category: 'melee' },
  { id: 'kuva_shildeg', name: "Kuva Shildeg", category: 'melee' },
  { id: 'kwath', name: "Kwath", category: 'melee' },
  { id: 'lacera', name: "Lacera", category: 'melee' },
  { id: 'laka', name: "Laka", category: 'melee' },
  { id: 'lecta', name: "Lecta", category: 'melee' },
  { id: 'lesion', name: "Lesion", category: 'melee' },
  { id: 'machete', name: "Machete", category: 'melee' },
  { id: 'machete_wraith', name: "Machete Wraith", category: 'melee' },
  { id: 'magistar', name: "Magistar", category: 'melee' },
  { id: 'masseter', name: "Masseter", category: 'melee' },
  { id: 'masseter_prime', name: "Masseter Prime", category: 'melee', prime: true },
  { id: 'mewan', name: "Mewan", category: 'melee' },
  { id: 'mewan_melee', name: "Mewan", category: 'melee' },
  { id: 'mios', name: "Mios", category: 'melee' },
  { id: 'mire', name: "Mire", category: 'melee' },
  { id: 'mk1_bo', name: "Mk1-Bo", category: 'melee' },
  { id: 'mk1_furax', name: "Mk1-Furax", category: 'melee' },
  { id: 'nami_skyla', name: "Nami Skyla", category: 'melee' },
  { id: 'nami_skyla_prime', name: "Nami Skyla Prime", category: 'melee', prime: true },
  { id: 'nami_solo', name: "Nami Solo", category: 'melee' },
  { id: 'nepheri', name: "Nepheri", category: 'melee' },
  { id: 'nikana', name: "Nikana", category: 'melee' },
  { id: 'nikana_prime', name: "Nikana Prime", category: 'melee', prime: true },
  { id: 'ninkondi', name: "Ninkondi", category: 'melee' },
  { id: 'ninkondi_prime', name: "Ninkondi Prime", category: 'melee', prime: true },
  { id: 'obex', name: "Obex", category: 'melee' },
  { id: 'ohma', name: "Ohma", category: 'melee' },
  { id: 'okina', name: "Okina", category: 'melee' },
  { id: 'okina_prime', name: "Okina Prime", category: 'melee', prime: true },
  { id: 'ooltha', name: "Ooltha", category: 'melee' },
  { id: 'ooltha_melee', name: "Ooltha", category: 'melee' },
  { id: 'orthos', name: "Orthos", category: 'melee' },
  { id: 'orthos_prime', name: "Orthos Prime", category: 'melee', prime: true },
  { id: 'orvius', name: "Orvius", category: 'melee' },
  { id: 'pangolin_prime', name: "Pangolin Prime", category: 'melee', prime: true },
  { id: 'pangolin_sword', name: "Pangolin Sword", category: 'melee' },
  { id: 'paracesis', name: "Paracesis", category: 'melee' },
  { id: 'pathocyst', name: "Pathocyst", category: 'melee' },
  { id: 'pennant', name: "Pennant", category: 'melee' },
  { id: 'peye', name: "Peye", category: 'melee' },
  { id: 'plague_akwin', name: "Plague Akwin", category: 'melee' },
  { id: 'plague_bokwin', name: "Plague Bokwin", category: 'melee' },
  { id: 'plague_keewar', name: "Plague Keewar", category: 'melee' },
  { id: 'plague_keewar_melee', name: "Plague Keewar", category: 'melee' },
  { id: 'plague_kripath', name: "Plague Kripath", category: 'melee' },
  { id: 'plague_kripath_melee', name: "Plague Kripath", category: 'melee' },
  { id: 'plasma_sword', name: "Plasma Sword", category: 'melee' },
  { id: 'praedos', name: "Praedos", category: 'melee' },
  { id: 'prisma_dual_cleavers', name: "Prisma Dual Cleavers", category: 'melee' },
  { id: 'prisma_machete', name: "Prisma Machete", category: 'melee' },
  { id: 'prisma_obex', name: "Prisma Obex", category: 'melee' },
  { id: 'prisma_ohma', name: "Prisma Ohma", category: 'melee' },
  { id: 'prisma_skana', name: "Prisma Skana", category: 'melee' },
  { id: 'prova', name: "Prova", category: 'melee' },
  { id: 'prova_vandal', name: "Prova Vandal", category: 'melee' },
  { id: 'pulmonars', name: "Pulmonars", category: 'melee' },
  { id: 'pupacyst', name: "Pupacyst", category: 'melee' },
  { id: 'quassus', name: "Quassus", category: 'melee' },
  { id: 'quassus_prime', name: "Quassus Prime", category: 'melee', prime: true },
  { id: 'rabvee', name: "Rabvee", category: 'melee' },
  { id: 'rakta_dark_dagger', name: "Rakta Dark Dagger", category: 'melee' },
  { id: 'reaper_prime', name: "Reaper Prime", category: 'melee', prime: true },
  { id: 'redeemer', name: "Redeemer", category: 'melee' },
  { id: 'redeemer_prime', name: "Redeemer Prime", category: 'melee', prime: true },
  { id: 'ripkas', name: "Ripkas", category: 'melee' },
  { id: 'ruhang', name: "Ruhang", category: 'melee' },
  { id: 'ruhang_ii', name: "Ruhang Ii", category: 'melee' },
  { id: 'rumblejack', name: "Rumblejack", category: 'melee' },
  { id: 'ruvox', name: "Ruvox", category: 'melee' },
  { id: 'sampotes', name: "Sampotes", category: 'melee' },
  { id: 'sancti_magistar', name: "Sancti Magistar", category: 'melee' },
  { id: 'sarofang', name: "Sarofang", category: 'melee' },
  { id: 'sarofang_prime', name: "Sarofang Prime", category: 'melee', prime: true },
  { id: 'sarpa', name: "Sarpa", category: 'melee' },
  { id: 'scindo', name: "Scindo", category: 'melee' },
  { id: 'scindo_prime', name: "Scindo Prime", category: 'melee', prime: true },
  { id: 'scoliac', name: "Scoliac", category: 'melee' },
  { id: 'secura_lecta', name: "Secura Lecta", category: 'melee' },
  { id: 'seekalla', name: "Seekalla", category: 'melee' },
  { id: 'sepfahn', name: "Sepfahn", category: 'melee' },
  { id: 'serro', name: "Serro", category: 'melee' },
  { id: 'shaku', name: "Shaku", category: 'melee' },
  { id: 'sheev', name: "Sheev", category: 'melee' },
  { id: 'shtung', name: "Shtung", category: 'melee' },
  { id: 'sibear', name: "Sibear", category: 'melee' },
  { id: 'sigma_and_octantis', name: "Sigma & Octantis", category: 'melee' },
  { id: 'silva_and_aegis', name: "Silva & Aegis", category: 'melee' },
  { id: 'silva_and_aegis_prime', name: "Silva & Aegis Prime", category: 'melee', prime: true },
  { id: 'skana', name: "Skana", category: 'melee' },
  { id: 'skana_prime', name: "Skana Prime", category: 'melee', prime: true },
  { id: 'skiajati', name: "Skiajati", category: 'melee' },
  { id: 'slaytra', name: "Slaytra", category: 'melee' },
  { id: 'spinnerex', name: "Spinnerex", category: 'melee' },
  { id: 'stropha', name: "Stropha", category: 'melee' },
  { id: 'sun_and_moon', name: "Sun & Moon", category: 'melee' },
  { id: 'syam', name: "Syam", category: 'melee' },
  { id: 'sydon', name: "Sydon", category: 'melee' },
  { id: 'synoid_heliocor', name: "Synoid Heliocor", category: 'melee' },
  { id: 'tak_and_lug', name: "Tak & Lug", category: 'melee' },
  { id: 'tatsu', name: "Tatsu", category: 'melee' },
  { id: 'tatsu_prime', name: "Tatsu Prime", category: 'melee', prime: true },
  { id: 'tekko', name: "Tekko", category: 'melee' },
  { id: 'tekko_prime', name: "Tekko Prime", category: 'melee', prime: true },
  { id: 'telos_boltace', name: "Telos Boltace", category: 'melee' },
  { id: 'tenet_agendus', name: "Tenet Agendus", category: 'melee' },
  { id: 'tenet_exec', name: "Tenet Exec", category: 'melee' },
  { id: 'tenet_grigori', name: "Tenet Grigori", category: 'melee' },
  { id: 'tenet_livia', name: "Tenet Livia", category: 'melee' },
  { id: 'thalys', name: "Thalys", category: 'melee' },
  { id: 'tipedo', name: "Tipedo", category: 'melee' },
  { id: 'tipedo_prime', name: "Tipedo Prime", category: 'melee', prime: true },
  { id: 'tonbo', name: "Tonbo", category: 'melee' },
  { id: 'tonkkatt', name: "Tonkkatt", category: 'melee' },
  { id: 'twin_basolk', name: "Twin Basolk", category: 'melee' },
  { id: 'twin_krohkur', name: "Twin Krohkur", category: 'melee' },
  { id: 'vargeet_ii_jai', name: "Vargeet Ii Jai", category: 'melee' },
  { id: 'vargeet_ii_ruhang', name: "Vargeet Ii Ruhang", category: 'melee' },
  { id: 'vargeet_jai', name: "Vargeet Jai", category: 'melee' },
  { id: 'vargeet_jai_ii', name: "Vargeet Jai Ii", category: 'melee' },
  { id: 'vargeet_ruhang', name: "Vargeet Ruhang", category: 'melee' },
  { id: 'vargeet_ruhang_ii', name: "Vargeet Ruhang Ii", category: 'melee' },
  { id: 'vastilok', name: "Vastilok", category: 'melee' },
  { id: 'vaykor_sydon', name: "Vaykor Sydon", category: 'melee' },
  { id: 'venato', name: "Venato", category: 'melee' },
  { id: 'venato_prime', name: "Venato Prime", category: 'melee', prime: true },
  { id: 'venka', name: "Venka", category: 'melee' },
  { id: 'venka_prime', name: "Venka Prime", category: 'melee', prime: true },
  { id: 'verdilac', name: "Verdilac", category: 'melee' },
  { id: 'vericres', name: "Vericres", category: 'melee' },
  { id: 'vitrica', name: "Vitrica", category: 'melee' },
  { id: 'volnus', name: "Volnus", category: 'melee' },
  { id: 'volnus_prime', name: "Volnus Prime", category: 'melee', prime: true },
  { id: 'war', name: "War", category: 'melee' },
  { id: 'wolf_sledge', name: "Wolf Sledge", category: 'melee' },
  { id: 'xoris', name: "Xoris", category: 'melee' },
  { id: 'zenistar', name: "Zenistar", category: 'melee' },
  { id: 'arbucep', name: "Arbucep", category: 'archgun' },
  { id: 'cortege', name: "Cortege", category: 'archgun' },
  { id: 'corvas', name: "Corvas", category: 'archgun' },
  { id: 'corvas_prime', name: "Corvas Prime", category: 'archgun', prime: true },
  { id: 'cyngas', name: "Cyngas", category: 'archgun' },
  { id: 'dual_decurion', name: "Dual Decurion", category: 'archgun' },
  { id: 'fluctus', name: "Fluctus", category: 'archgun' },
  { id: 'grattler', name: "Grattler", category: 'archgun' },
  { id: 'imperator', name: "Imperator", category: 'archgun' },
  { id: 'imperator_vandal', name: "Imperator Vandal", category: 'archgun' },
  { id: 'kuva_ayanga', name: "Kuva Ayanga", category: 'archgun' },
  { id: 'kuva_grattler', name: "Kuva Grattler", category: 'archgun' },
  { id: 'larkspur', name: "Larkspur", category: 'archgun' },
  { id: 'larkspur_prime', name: "Larkspur Prime", category: 'archgun', prime: true },
  { id: 'mandonel', name: "Mandonel", category: 'archgun' },
  { id: 'mausolon', name: "Mausolon", category: 'archgun' },
  { id: 'morgha', name: "Morgha", category: 'archgun' },
  { id: 'phaedra', name: "Phaedra", category: 'archgun' },
  { id: 'prisma_dual_decurions', name: "Prisma Dual Decurions", category: 'archgun' },
  { id: 'velocitus', name: "Velocitus", category: 'archgun' },
];

const FRAME_ITEMS = [...FRAMES, ...ARCHWINGS, ...NECRAMECHS];
const ALL_ITEMS = [...FRAME_ITEMS, ...WEAPONS];

const WEAPON_SUBTABS = [
  { key: 'all', label: 'All' },
  { key: 'primary', label: 'Primary' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'melee', label: 'Melee' },
  { key: 'archgun', label: 'Archgun' },
];

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'owned', label: 'Owned' },
  { key: 'unowned', label: 'Unowned' },
];

const DEFAULT_FRAME_OWNED = {};

const DEFAULT_WEAPON_OWNED = {};

const FRAME_STORAGE_KEY = 'mc_wf_frames_v1';
const WEAPON_STORAGE_KEY = 'mc_wf_weapons_v1';

function loadStorage(key, defaults) {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return { ...defaults };
    return JSON.parse(raw) || { ...defaults };
  } catch {
    return { ...defaults };
  }
}

function saveStorage(key, data) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
}

function getCategoryGlyph(item) {
  if (item.prime) return '👑';
  switch (item.category) {
    case 'archwing': return '✈️';
    case 'necramech': return '🤖';
    case 'primary': return '🔫';
    case 'secondary': return '🔫';
    case 'melee': return '⚔️';
    case 'archgun': return '✈️';
    default: return '⚔️';
  }
}

function getCategoryIcon(category) {
  switch (category) {
    case 'archwing': return '✈️';
    case 'necramech': return '🤖';
    case 'primary': return '🔫';
    case 'secondary': return '🔫';
    case 'melee': return '⚔️';
    case 'archgun': return '✈️';
    default: return '';
  }
}

function ItemCard({ item, owned, onToggle }) {
  const isOwned = !!owned[item.id];
  return (
    <div
      className={`wfColCard ${isOwned ? 'wfColCardOwned' : ''} ${item.prime ? 'wfColCardPrime' : ''}`}
      onClick={() => onToggle(item.id)}
      title={isOwned ? `${item.name} — owned (click to unmark)` : `${item.name} — not owned (click to mark)`}
    >
      <div className="wfColCardImage">
        <div className="wfColCardPlaceholder">
          <span className="wfColCardGlyph">{getCategoryGlyph(item)}</span>
        </div>
        {isOwned && <div className="wfColCardWreath" aria-label="Owned">🌿</div>}
      </div>
      <div className="wfColCardLabel">
        {getCategoryIcon(item.category) && <span className="wfColCardTypeIcon">{getCategoryIcon(item.category)}</span>}
        <span className="wfColCardName">{item.name}</span>
      </div>
    </div>
  );
}

export default function WarframeCollectionsClient() {
  const [frameOwned, setFrameOwned] = useState(null);
  const [weaponOwned, setWeaponOwned] = useState(null);
  const [topTab, setTopTab] = useState('frames');
  const [weaponSubtab, setWeaponSubtab] = useState('all');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setFrameOwned(loadStorage(FRAME_STORAGE_KEY, DEFAULT_FRAME_OWNED));
    setWeaponOwned(loadStorage(WEAPON_STORAGE_KEY, DEFAULT_WEAPON_OWNED));
  }, []);

  const toggleFrame = useCallback((id) => {
    setFrameOwned(prev => {
      if (!prev) return prev;
      const next = { ...prev, [id]: !prev[id] };
      saveStorage(FRAME_STORAGE_KEY, next);
      return next;
    });
  }, []);

  const toggleWeapon = useCallback((id) => {
    setWeaponOwned(prev => {
      if (!prev) return prev;
      const next = { ...prev, [id]: !prev[id] };
      saveStorage(WEAPON_STORAGE_KEY, next);
      return next;
    });
  }, []);

  if (!frameOwned || !weaponOwned) {
    return <div className="wfLoading">Loading collection...</div>;
  }

  const isFrames = topTab === 'frames';
  const items = isFrames ? FRAME_ITEMS : WEAPONS;
  const owned = isFrames ? frameOwned : weaponOwned;
  const toggleFn = isFrames ? toggleFrame : toggleWeapon;

  let filtered = items;
  if (!isFrames && weaponSubtab !== 'all') {
    filtered = filtered.filter(i => i.category === weaponSubtab);
  }

  if (search.trim()) {
    const q = search.trim().toLowerCase();
    filtered = filtered.filter(i => i.name.toLowerCase().includes(q));
  }

  if (filter === 'owned') {
    filtered = filtered.filter(i => owned[i.id]);
  } else if (filter === 'unowned') {
    filtered = filtered.filter(i => !owned[i.id]);
  }

  const baseItems = isFrames ? FRAME_ITEMS : (weaponSubtab === 'all' ? WEAPONS : WEAPONS.filter(i => i.category === weaponSubtab));
  const total = baseItems.length;
  const totalOwned = baseItems.filter(i => owned[i.id]).length;
  const pct = total > 0 ? Math.round((totalOwned / total) * 100) : 0;

  const markAll = () => {
    const all = {};
    baseItems.forEach(i => { all[i.id] = true; });
    if (isFrames) { saveStorage(FRAME_STORAGE_KEY, all); setFrameOwned(all); }
    else { saveStorage(WEAPON_STORAGE_KEY, all); setWeaponOwned(all); }
  };

  const clearAll = () => {
    if (isFrames) { saveStorage(FRAME_STORAGE_KEY, {}); setFrameOwned({}); }
    else { saveStorage(WEAPON_STORAGE_KEY, {}); setWeaponOwned({}); }
  };

  return (
    <div className="wfCollections">
      <div className="wfColTopTabs">
        <button
          className={`wfColTopTab ${topTab === 'frames' ? 'wfColTopTabActive' : ''}`}
          onClick={() => { setTopTab('frames'); setSearch(''); setFilter('all'); }}
        >
          Frames
        </button>
        <button
          className={`wfColTopTab ${topTab === 'weapons' ? 'wfColTopTabActive' : ''}`}
          onClick={() => { setTopTab('weapons'); setSearch(''); setFilter('all'); }}
        >
          Weapons
        </button>
      </div>

      <div className="wfSummaryBar">
        <div className="wfSummaryStats">
          <div className="wfSummaryStat">
            <span className="wfSummaryValue">{totalOwned}</span>
            <span className="wfSummaryLabel">owned</span>
          </div>
          <div className="wfSummaryStat">
            <span className="wfSummaryValue">{total - totalOwned}</span>
            <span className="wfSummaryLabel">unowned</span>
          </div>
          <div className="wfSummaryStat">
            <span className="wfSummaryValue">{pct}%</span>
            <span className="wfSummaryLabel">complete</span>
          </div>
        </div>
        <div className="wfSummaryActions">
          <button className="wfActionBtn" onClick={markAll}>Mark All</button>
          <button className="wfActionBtn" onClick={clearAll}>Clear All</button>
        </div>
      </div>

      <div className="wfColFilters">
        {!isFrames && (
          <div className="wfColFilterGroup">
            {WEAPON_SUBTABS.map(s => (
              <button
                key={s.key}
                className={`wfColFilterBtn ${weaponSubtab === s.key ? 'wfColFilterActive' : ''}`}
                onClick={() => setWeaponSubtab(s.key)}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
        <div className="wfColFilterGroup">
          {FILTERS.map(f => (
            <button
              key={f.key}
              className={`wfColFilterBtn ${filter === f.key ? 'wfColFilterActive' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <input
          type="text"
          className="wfColSearch"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="wfColGrid">
        {filtered.length === 0 && (
          <div className="wfColEmpty">No items match your filters.</div>
        )}
        {filtered.map(item => (
          <ItemCard key={item.id} item={item} owned={owned} onToggle={toggleFn} />
        ))}
      </div>

      <div className="wfFooter">
        <p className="wfAttribution">
          Warframe and all related assets are the intellectual property of Digital Extremes Ltd.
          This is an unofficial fan-made tool.
        </p>
      </div>
    </div>
  );
}
