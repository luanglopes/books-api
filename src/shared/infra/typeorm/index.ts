import { createConnection, getConnectionOptions } from 'typeorm'

const initDatabase = async (): Promise<void> => {
  const connOptions = await getConnectionOptions()

  if (process.env.NODE_ENV === 'production') {
    Object.assign(connOptions, {
      entities: [
        connOptions.entities?.map((path) =>
          path.toString().replace('src', 'dist'),
        ),
      ],
    })
  }

  await createConnection(connOptions)
}

// eslint-disable-next-line no-console
initDatabase().catch(console.error)
