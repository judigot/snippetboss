import CreateDatabase from './CreateDatabase';
import DeleteTables from './DeleteTables';
import Seed from '../seed/seed';

(async () => {
  try {
    await DeleteTables();
    await CreateDatabase();
    await Seed();
  } catch (error) {
    console.error(
      'An error occurred during the database setup process:',
      error,
    );
  }
})();
