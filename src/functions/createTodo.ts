import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "src/utils/dynamodbClient";

interface ICreateTodo {
    id: string
    title: string
    deadline: string
}

export const handler: APIGatewayProxyHandler = async(event) => {
    const { id, title, deadline} = JSON.parse(event.body) as ICreateTodo
    const {userId} = event.pathParameters

    await document.put({
        TableName: "todos",
        Item: {
            id,
            userId,
            title,
            done: false,
            deadline: new Date(deadline)
        }
    }).promise()

    return {
        statusCode: 201,
        body: JSON.stringify({ 
            message: "Todo criado com sucesso!",
        })
    }
}