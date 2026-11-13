UPDATE "admin_clients"
SET "monthly_status" = 'active'
WHERE "monthly_status" IN ('current', 'not_started');
