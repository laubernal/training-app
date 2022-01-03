CREATE TABLE IF NOT EXISTS users (
    us_id VARCHAR(50) PRIMARY KEY,
    us_first_name VARCHAR(50),
    us_last_name VARCHAR(50),
    us_email VARCHAR(100),
    us_password VARCHAR(50)
);
CREATE TABLE IF NOT EXISTS category (
    cat_id VARCHAR(50) PRIMARY KEY,
    cat_name VARCHAR(100);
);
CREATE TABLE IF NOT EXISTS training (
    tr_id VARCHAR(50) PRIMARY KEY,
    tr_date DATE,
    tr_note VARCHAR(500),
    FK_us_id VARCHAR(50) REFERENCES users(us_id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS exercise (
    ex_id VARCHAR(50) PRIMARY KEY,
    ex_name VARCHAR(100),
    FK_cat_id VARCHAR(50) REFERENCES category(cat_id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS training_exercise (
    tr_ex_id VARCHAR(50) PRIMARY KEY,
    training_id VARCHAR(50) REFERENCES training(tr_id) ON DELETE CASCADE,
    exercise_id VARCHAR(50) REFERENCES exercise(ex_id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS exercise_set (
    set_id VARCHAR(50) PRIMARY KEY,
    set_count INT,
    set_reps INT,
    set_weight INT,
    FK_ex_id VARCHAR(50) REFERENCES exercise(ex_id) ON DELETE CASCADE
);