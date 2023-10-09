module.exports = {
    employee_get: {
        SpName: "employee_get",
        Schema: [
        ],
        Server: "SQL", Database: "APPT"
    },
    employee_insert: {
        SpName: "employee_insert",
        Schema: [{ type: "INT", column: "id", direction: "IN", alias: "id" },
        { type: "VARCHAR", column: "Name", direction: "IN", alias: "Name" },
        ],
        Server: "SQL", Database: "APPT"
    },
    employee_update: {
        SpName: "employee_update",
        Schema: [{ type: "INT", column: "id", direction: "IN", alias: "id" },
        { type: "VARCHAR", column: "Name", direction: "IN", alias: "Name" },
        ],
        Server: "SQL", Database: "APPT"
    },
    employee_delete: {
        SpName: "employee_delete",
        Schema: [{ type: "INT", column: "id", direction: "IN", alias: "id" },
        ],
        Server: "SQL", Database: "APPT"
    },
}