
let inMemoryData = {
    classes: [
        {
            id: 101,
            title: "Math",
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 102,
            title: "Music",
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 103,
            title: "IT",
            created_at: new Date(),
            updated_at: new Date(),
        }
    ],
    students:[
        {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 2,
            name: "Steve Jobs",
            email: "steve.jobs@example.com",
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 3,
            name: "Bill Gates",
            email: "bill.gates@example.com",
            created_at: new Date(),
            updated_at: new Date(),
        }
    ],
    student_classes: [
        {
            student_id: 1,
            class_id: 102,
            joined_at: new Date(),
        },
        {
            student_id: 1,
            class_id: 101,
            joined_at: new Date(),
        },
        {
            student_id: 3,
            class_id: 103,
            joined_at: new Date(),
        }
    ],
}

module.exports = inMemoryData