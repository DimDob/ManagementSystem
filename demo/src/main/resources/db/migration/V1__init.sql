CREATE TABLE IF NOT EXISTS employees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_name VARCHAR(255) NOT NULL,
    employee_surname VARCHAR(255) NOT NULL,
    employee_department VARCHAR(255),
    employee_salary VARCHAR(3) CHECK (employee_salary IN ('EUR', 'BGN')),
    salary_amount NUMERIC(15, 2),
    employee_email VARCHAR(255) UNIQUE NOT NULL,
    employee_phone_number VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin VARCHAR(10)
);
