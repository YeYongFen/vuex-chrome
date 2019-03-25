import { handleConnection } from './chromeUtils';
import { checkConnectId, removeConnectId } from './idUtils';

const bgPrefix = 'BACKGROUND_';
class BackgroundScript {
  constructor (store) {
    this.store = store;
    this.connections = [];

    this.store.subscribe((mutation) => {
      for (let i = 0; i < this.connections.length; i++) {
        const connection = this.connections[i];
        let mutationType = mutation.type;
        if (mutationType.indexOf(connection.name) === 0) {
          continue;
        }

        if (checkConnectId(mutationType)) {
          mutationType = removeConnectId(mutationType);
        }

        this.sendMutation(connection, { ...mutation, type: bgPrefix + mutationType, });
      }
    });

    handleConnection((connection) => {
      this.onConnection(connection);
    });
  }

  onConnection (connection) {
    this.bindMutation(connection);

    connection.onDisconnect.addListener((conn) => {
      this.onDisconnect(conn);
      this.unbindMutation(connection);
    });

    connection.onMessage.addListener((message) => {
      this.onMessage(connection, message);
    });

    this.connections.push(connection);

    connection.postMessage({
      type: '@@STORE_INITIAL_STATE',
      data: this.store.state,
    });
  }

  bindMutation (connection) {
    const connectName = connection.name;
    const { _mutations: mutations, } = this.store;
    Object.entries(mutations).forEach(([type, funcList]) => {
      const isF = this.connections.some((conn) => {
        return type.indexOf(conn.name) === 0;
      });

      if (!isF) {
        mutations[connectName + type] = funcList;
      }
    });
  }

  unbindMutation (connection) {
    const connectName = connection.name;
    const { _mutations: mutations, } = this.store;
    Object.entries(mutations).forEach(([type, funcList]) => {
      if (type.indexOf(connectName) === 0) {
        delete mutations[type];
      }
    });
  }

  onDisconnect (connection) {
    for (let i = this.connections.length - 1; i >= 0; i--) {
      if (this.connections[i].name === connection.name) {
        this.connections.splice(i, 1);
        console.log('disconnect', connection.name);
      }
    }
  }

  onMessage (connection, message) {
    if (message.type !== '@@STORE_SYNC_MUTATION') {
      return;
    }
    this.store.commit(message.data.type, message.data.payload);
  }

  sendMutation (connection, mutation) {
    connection.postMessage({
      type: '@@STORE_SYNC_MUTATION',
      data: mutation,
    });
  }
}

export default BackgroundScript;
