"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		// USERS
		await queryInterface.sequelize.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email_unique ON users(email);
    `);

		await queryInterface.sequelize.query(`
      CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
    `);

		// USER_ROLES
		await queryInterface.sequelize.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'fk_user_roles_user'
        ) THEN
          ALTER TABLE user_roles
          ADD CONSTRAINT fk_user_roles_user
          FOREIGN KEY (user_id) REFERENCES users(id)
          ON DELETE CASCADE ON UPDATE CASCADE;
        END IF;
      END$$;
    `);

		await queryInterface.sequelize.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'fk_user_roles_role'
        ) THEN
          ALTER TABLE user_roles
          ADD CONSTRAINT fk_user_roles_role
          FOREIGN KEY (role_id) REFERENCES roles(id)
          ON DELETE CASCADE ON UPDATE CASCADE;
        END IF;
      END$$;
    `);

		await queryInterface.sequelize.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'unique_user_role'
        ) THEN
          ALTER TABLE user_roles
          ADD CONSTRAINT unique_user_role UNIQUE (user_id, role_id);
        END IF;
      END$$;
    `);

		await queryInterface.sequelize.query(`
      CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
    `);

		await queryInterface.sequelize.query(`
      CREATE INDEX IF NOT EXISTS idx_user_roles_role_id ON user_roles(role_id);
    `);

		// ROLE_PERMISSIONS
		await queryInterface.sequelize.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'fk_role_permissions_role'
        ) THEN
          ALTER TABLE role_permissions
          ADD CONSTRAINT fk_role_permissions_role
          FOREIGN KEY (role_id) REFERENCES roles(id)
          ON DELETE CASCADE;
        END IF;
      END$$;
    `);

		await queryInterface.sequelize.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'fk_role_permissions_permission'
        ) THEN
          ALTER TABLE role_permissions
          ADD CONSTRAINT fk_role_permissions_permission
          FOREIGN KEY (permission_id) REFERENCES permissions(id)
          ON DELETE CASCADE;
        END IF;
      END$$;
    `);

		await queryInterface.sequelize.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'unique_role_permission'
        ) THEN
          ALTER TABLE role_permissions
          ADD CONSTRAINT unique_role_permission UNIQUE (role_id, permission_id);
        END IF;
      END$$;
    `);

		await queryInterface.sequelize.query(`
      CREATE INDEX IF NOT EXISTS idx_role_permissions_role_id ON role_permissions(role_id);
    `);

		await queryInterface.sequelize.query(`
      CREATE INDEX IF NOT EXISTS idx_role_permissions_permission_id ON role_permissions(permission_id);
    `);

		//  FLIGHTS
		await queryInterface.sequelize.query(`
      CREATE INDEX IF NOT EXISTS idx_flights_aircraft_id ON flights(aircraft_id);
    `);

		await queryInterface.sequelize.query(`
      CREATE INDEX IF NOT EXISTS idx_flights_origin_airport ON flights(origin_airport);
    `);

		await queryInterface.sequelize.query(`
      CREATE INDEX IF NOT EXISTS idx_flights_destination_airport ON flights(destination_airport);
    `);

		await queryInterface.sequelize.query(`
      CREATE INDEX IF NOT EXISTS idx_flights_scheduled_departure ON flights(scheduled_departure);
    `);

		//OPERATIONAL EVENTS
		await queryInterface.sequelize.query(`
      CREATE INDEX IF NOT EXISTS idx_operational_events_flight_id ON operational_events(flight_id);
    `);

		await queryInterface.sequelize.query(`
      CREATE INDEX IF NOT EXISTS idx_operational_events_event_type ON operational_events(event_type);
    `);

		await queryInterface.sequelize.query(`
      CREATE INDEX IF NOT EXISTS idx_operational_events_created_at ON operational_events("createdAt");
    `);

		// ANALYTICS
		await queryInterface.sequelize.query(`
      CREATE INDEX IF NOT EXISTS idx_analytics_date ON analytics_summary(date);
    `);

		await queryInterface.sequelize.query(`
      CREATE INDEX IF NOT EXISTS idx_analytics_aircraft_id ON analytics_summary(aircraft_id);
    `);

		await queryInterface.sequelize.query(`
      CREATE INDEX IF NOT EXISTS idx_analytics_origin_airport ON analytics_summary(origin_airport);
    `);
	},

	async down(queryInterface, Sequelize) {},
};
