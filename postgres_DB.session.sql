-- SELECT *
-- FROM training
--   INNER JOIN training_exercise ON training.tr_id = training_exercise.training_id
--   INNER JOIN exercise ON training_exercise.exercise_id = exercise.ex_id
--   INNER JOIN exercise_set ON exercise.ex_id = exercise_set.fk_ex_id
--   INNER JOIN category ON category.cat_id = exercise.fk_cat_id
-- ORDER BY exercise_id ASC,
--   set_count ASC
-- WHERE $ { column } = $1 

-- DELETE FROM category WHERE cat_id = 'ea1f64af-dc03-4279-bdef-7a096b938335';
-- DELETE FROM exercise;
-- DELETE FROM exercise_set;
-- DELETE FROM training;
-- DELETE FROM training_exercise;

-- DELETE FROM exercise_set WHERE set_id = 'd45b8fbe-1f15-45ee-97c2-fea9515e32d9';
-- DELETE FROM exercise_set WHERE set_id = 'b6248eac-baff-4484-add7-ece6e4d51454';
-- DELETE FROM exercise_set WHERE set_id = '91128bb5-009b-4005-babf-250b7af79a39';
-- DELETE FROM exercise_set WHERE set_id = '0aa30962-d389-4a71-9f09-e5944eabc60c';
-- DELETE FROM exercise_set WHERE set_id = '104d95b1-44ca-4f4a-8613-4562ecabebbf';
-- DELETE FROM exercise_set WHERE set_id = '77a2163b-87f8-4dbb-bf6b-e2a95e9b7499';

-- SELECT ex_id, ex_name FROM exercise WHERE ex_name LIKE 'Sentadilla';

-- INSERT INTO category (cat_id, cat_name)
--   VALUES ('3', 'Espalda');
  
--   INSERT INTO exercise (ex_id, ex_name, fk_cat_id)
--   VALUES ('4', 'Dominadas', '3');

--   INSERT INTO exercise_set (
--       set_id,
--       set_count,
--       set_reps,
--       set_weight,
--       fk_ex_id
--     )
--   VALUES ('7', 1, 10, 0, '4');

--   INSERT INTO exercise_set (
--       set_id,
--       set_count,
--       set_reps,
--       set_weight,
--       fk_ex_id
--     )
--   VALUES ('9', 3, 8, 2.5, '4');

--   INSERT INTO training (tr_id, tr_date, tr_note, fk_us_id, tr_title)
--   VALUES (
--       '3',
--       '2022/01/27',
--       'adding a third training',
--       'a8242cca-6221-4e03-a818-5c12f7069493',
--       'Third training'
--     );

--   INSERT INTO training_exercise (tr_ex_id, training_id, exercise_id)
--   VALUES ('4', '3', '3');