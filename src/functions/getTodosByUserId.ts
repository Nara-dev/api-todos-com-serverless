import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "src/utils/dynamodbClient";

export const handler: APIGatewayProxyHandler = async(event) => {
    const {id} = event.pathParameters

    const response = await document.query({
        TableName: "todos",
        KeyConditionExpression: "id  = :id",
        ExpressionAttributeValues: {
            ":id": id
        }
    }).promise()

    return {
        statusCode: 200,
        body: JSON.stringify(response.Items)
    }
}