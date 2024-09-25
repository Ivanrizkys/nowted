import { useEffect, useState } from "react";
import {
	type ExtractDocumentTypeFromTypedRxJsonSchema,
	type RxDatabase,
	type RxJsonSchema,
	createRxDatabase,
	toTypedRxJsonSchema,
} from "rxdb";
import { addRxPlugin } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { RxDBUpdatePlugin } from "rxdb/plugins/update";

addRxPlugin(RxDBUpdatePlugin);

let dbPromise: Promise<RxDatabase> | null = null; // Singleton pattern to ensure a single instance

const foldersSchemaLiteral = {
	title: "folders",
	version: 0,
	description: "collection folder to store a note",
	type: "object",
	primaryKey: "folder_id",
	properties: {
		folder_id: {
			type: "string",
			maxLength: 50,
		},
		name: {
			type: "string",
			maxLength: 100,
		},
		created_at: {
			type: "string",
			maxLength: 30,
			final: true,
		},
		updated_at: {
			type: "string",
			maxLength: 30,
		},
	},
	required: ["folder_id", "name", "created_at", "updated_at"],
} as const;

const notesSchemaLiteral = {
	title: "notes",
	version: 0,
	description: "collection a notes",
	type: "object",
	primaryKey: "note_id",
	properties: {
		note_id: {
			type: "string",
			maxLength: 50,
		},
		folder_id: {
			type: "string",
			maxLength: 50,
		},
		title: {
			type: "string",
		},
		content: {
			type: "array",
			default: [
				{
					type: "paragraph",
					children: [{ text: "Write your thoughts here .." }],
				},
			],
		},
		created_at: {
			type: "string",
			maxLength: 30,
			final: true,
		},
		updated_at: {
			type: "string",
			maxLength: 30,
		},
	},
	required: ["note_id", "folder_id", "title", "created_at", "updated_at"],
} as const;

const folderSchemaTyped = toTypedRxJsonSchema(foldersSchemaLiteral);
export type FoldersDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
	typeof folderSchemaTyped
>;
const foldersSchema: RxJsonSchema<FoldersDocType> = foldersSchemaLiteral;

const notesSchemaTyped = toTypedRxJsonSchema(notesSchemaLiteral);
export type NotesDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
	typeof notesSchemaTyped
>;
const notesSchema: RxJsonSchema<NotesDocType> = notesSchemaLiteral;

const initRxDatabase = async (): Promise<RxDatabase> => {
	if (!dbPromise) {
		dbPromise = createRxDatabase({
			name: "nowted",
			storage: getRxStorageDexie(),
		}).then(async (db) => {
			await db.addCollections({
				folders: {
					schema: foldersSchema,
				},
				notes: {
					schema: notesSchema,
				},
			});
			return db;
		});
	}
	return dbPromise;
};

export const useCreateRxDatabase = () => {
	const [db, setDb] = useState<RxDatabase | undefined>();

	useEffect(() => {
		let isMounted = true;
		if (!db) {
			initRxDatabase().then((database) => {
				if (isMounted) setDb(database);
			});
		}

		return () => {
			isMounted = false;
		};
	}, [db]);

	return db;
};
