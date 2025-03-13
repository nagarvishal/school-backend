export const DB_COLLECTION_NAME = {
    users : "in_user",
    unique:"in_unique",
    exam:"in_exam",
    subjects:"in_subject",
    subject_exam:"in_exam_subject",
    student_subject_exam:"in_student_subject_exam",
    template:"in_template",
    question:"in_question",
    answer:"in_answer",
    assesment:"in_assesment",
    studentanswers:"in_student_answers",
    document:"in_document"
}

export const CONNECTION_NAME = 'school';

export const DEFAULT_MONGODB_ANTI_PROJECTION = {
    expiresAt: 0,
    dataSource: 0,
    encryptedAppId: 0,
    _id: 0,
    __v: 0,
    createdAt: 0,
    updatedAt: 0,
};