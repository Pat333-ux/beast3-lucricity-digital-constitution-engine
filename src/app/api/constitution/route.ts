import { NextResponse } from "next/server";
import { z } from "zod";

const constitutionArticleSchema = z.object({
  articleNumber: z.number().int().positive(),
  title: z.string().min(3),
  section: z.string().min(1),
  content: z.string().min(10),
  governanceCategory: z.enum([
    "Member Rights",
    "Resource Allocation",
    "System Governance",
    "Compliance & Audit",
  ]),
});

export async function GET() {
  try {
    const activeArticles = [
      {
        id: "art_001",
        articleNumber: 1,
        title: "Inherent Rights & Universal Access to Resource Allocation",
        section: "Section 1.1 - Member Entitlement Framework",
        content:
          "All registered members within the ecosystem hold fundamental rights to transparent, equitable, and automated resource distribution based on verified needs assessments and constitutional parameters.",
        governanceCategory: "Member Rights",
        effectiveDate: "2026-01-01T00:00:00Z",
        status: "Active",
      },
      {
        id: "art_002",
        articleNumber: 2,
        title: "Algorithmic Integrity & Auditable Compliance",
        section: "Section 2.3 - Governance & Automated Verification",
        content:
          "All evaluation algorithms, entitlement rules, and benefit routing mechanisms must maintain full transparency, cryptographically verifiable records, and continuous compliance auditing.",
        governanceCategory: "Compliance & Audit",
        effectiveDate: "2026-01-01T00:00:00Z",
        status: "Active",
      },
    ];

    return NextResponse.json({
      constitutionVersion: "3.0.0",
      totalArticles: activeArticles.length,
      articles: activeArticles,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load constitutional articles" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = constitutionArticleSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid constitutional article schema", details: validation.error.format() },
        { status: 400 }
      );
    }

    const newArticle = {
      id: `art_${Date.now()}`,
      ...validation.data,
      effectiveDate: new Date().toISOString(),
      status: "Proposed",
    };

    return NextResponse.json(
      {
        message: "Constitutional article amendment registered successfully",
        article: newArticle,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to record constitutional amendment" },
      { status: 500 }
    );
  }
}
