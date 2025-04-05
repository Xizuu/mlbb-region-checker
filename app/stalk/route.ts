import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { userId, zoneId } = await request.json();

        if (!userId || !zoneId) {
            return NextResponse.json(
                {
                    status: false,
                    message: "UserID and ZoneID are required.",
                },
                { status: 400 }
            );
        }

        const apiResponse = await fetch("https://ryuzenstore.com/cek-ml-stalker", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userid: userId,
                zoneid: zoneId,
            }),
        });

        const result = await apiResponse.json();

        if (result.status) {
            return NextResponse.json(result, { status: 200 });
        } else {
            return NextResponse.json(
                {
                    status: false,
                    message:
                        result.message || "Failed to fetch player data. Please check your ID and try again.",
                },
                { status: 502 }
            );
        }
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json(
            {
                status: false,
                message: "Internal server error. Please try again later.",
            },
            { status: 500 }
        );
    }
}
