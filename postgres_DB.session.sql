-- SELECT *
-- FROM training
--   INNER JOIN training_exercise ON training.tr_id = training_exercise.training_id
--   INNER JOIN exercise ON training_exercise.exercise_id = exercise.ex_id
--   INNER JOIN exercise_set ON exercise.ex_id = exercise_set.fk_ex_id
--   INNER JOIN category ON category.cat_id = exercise.fk_cat_id
-- ORDER BY exercise_id ASC,
--   set_count ASC
-- WHERE $ { column } = $1 

SELECT ex_id, ex_name FROM exercise WHERE ex_name LIKE 'Sentadilla';

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
--   VALUES ('8', 2, 8, 0, '4');

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