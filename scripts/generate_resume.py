from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import HRFlowable, PageBreak, Paragraph, SimpleDocTemplate, Spacer


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "Jiaying-Jin-Resume.pdf"
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

ORANGE = colors.HexColor("#F47C4D")
INK = colors.HexColor("#1F1F1F")
MUTED = colors.HexColor("#5F5854")

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="Name", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=25, leading=28, textColor=INK, spaceAfter=2))
styles.add(ParagraphStyle(name="Position", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=10, leading=13, textColor=ORANGE, tracking=1.2, spaceAfter=8))
styles.add(ParagraphStyle(name="Contact", parent=styles["Normal"], fontName="Helvetica", fontSize=8.5, leading=12, textColor=MUTED, alignment=TA_RIGHT))
styles.add(ParagraphStyle(name="Section", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=12, leading=15, textColor=ORANGE, spaceBefore=9, spaceAfter=5))
styles.add(ParagraphStyle(name="Role", parent=styles["Heading3"], fontName="Helvetica-Bold", fontSize=10.5, leading=13, textColor=INK, spaceBefore=5, spaceAfter=2))
styles.add(ParagraphStyle(name="Meta", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=8.5, leading=11, textColor=MUTED, spaceAfter=3))
styles.add(ParagraphStyle(name="BodySmall", parent=styles["BodyText"], fontName="Helvetica", fontSize=8.5, leading=12, textColor=INK, spaceAfter=4))
styles.add(ParagraphStyle(name="BulletSmall", parent=styles["BodyText"], fontName="Helvetica", fontSize=8.1, leading=11, leftIndent=10, firstLineIndent=-6, textColor=INK, spaceAfter=2))


def bullet(text: str) -> Paragraph:
    return Paragraph(f"- {text}", styles["BulletSmall"])


def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor("#E8D6CD"))
    canvas.line(18 * mm, 13 * mm, 192 * mm, 13 * mm)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(18 * mm, 8.5 * mm, "Jiaying Jin - AI Product & Risk Strategy")
    canvas.drawRightString(192 * mm, 8.5 * mm, f"Page {doc.page}")
    canvas.restoreState()


story = [
    Paragraph("JIAYING JIN", styles["Name"]),
    Paragraph("AI PRODUCT  |  RISK STRATEGY  |  INTELLIGENT DECISION SYSTEMS", styles["Position"]),
    Paragraph("Shanghai  |  15958535485  |  hellojjymia@gmail.com  |  nomo-drab.vercel.app", styles["BodySmall"]),
    HRFlowable(width="100%", thickness=1.5, color=ORANGE, spaceBefore=4, spaceAfter=7),
    Paragraph("PROFILE", styles["Section"]),
    Paragraph("AI product and risk strategy professional with more than three years of experience designing credit approval workflows, risk strategies, and intelligent decision systems. Experienced in translating complex business rules into structured product requirements, data and model frameworks, controlled launches, monitoring systems, and scalable user experiences.", styles["BodySmall"]),
    Paragraph("EXPERIENCE", styles["Section"]),
    Paragraph("Risk Strategy Manager - Shenzhen Fenqile Technology (Shanghai)", styles["Role"]),
    Paragraph("Sep 2025 - Present", styles["Meta"]),
    bullet("Lead full-funnel risk strategy design across customer acquisition screening, credit approval, and ongoing monitoring."),
    bullet("Build standardized strategy frameworks by channel and asset type; design segmentation, profiling, and risk exclusion strategies."),
    bullet("Coordinate technology and business teams to launch strategies through controlled traffic experiments and post-launch monitoring."),
    Paragraph("AI Credit Approval Assistant", styles["Role"]),
    bullet("Structured identity verification, ID upload, facial recognition, approval review, and credit activation into state-aware AI workflows."),
    bullet("Designed knowledge-base structure, four state-query interfaces, four business-tool interfaces, retry conditions, exception handling, prompts, tool calls, execution logs, and conversion observability."),
    bullet("Scaled from approximately 5,000 daily applications to more than 1 million; approval conversion increased by 20%."),
    Paragraph("24% Pricing Framework Credit Approval Strategy Redesign", styles["Role"]),
    bullet("Moved risk identification upstream to acquisition screening and built risk-return measurement by asset type, duration, funding cost, and customer rating."),
    bullet("Launched at 10% traffic with 3-5 day observation cycles monitoring approval rate, FPD1$, FPD7$, and profitability."),
    bullet("FPD7$ reached approximately 0.9% for three consecutive months; channel approval rates recovered to the pre-policy-change peak."),
    Spacer(1, 3),
    Paragraph("Analyst - Deloitte Fengyu Intelligent Technology (Shanghai)", styles["Role"]),
    Paragraph("Jan 2024 - Sep 2025", styles["Meta"]),
    bullet("Built end-to-end risk management workflows across data, models, strategy, monitoring, and closed-loop optimization."),
    bullet("Coordinated sales, product, operations, data, and development teams; defined milestones, testing requirements, and delivery plans."),
    PageBreak(),
    Paragraph("SELECTED PRODUCT & RISK WORK", styles["Section"]),
    Paragraph("Bond Risk Early Warning Platform - Product Lead & Quantitative Modeling", styles["Role"]),
    bullet("Led zero-to-one product planning, user scenarios, prototypes, PRDs, data frameworks, backtesting, UAT, launch, and iteration."),
    bullet("Processed nearly five years of issuer data; used Random Forest, XGBoost, regression, dynamic factor weighting, risk scoring, and monitoring."),
    bullet("Achieved KS above 70 and AUC above 95; purchased by four major state-owned banks and leading securities companies."),
    Paragraph("Country Risk Stress Testing - Quantitative Modeling", styles["Role"]),
    bullet("Designed a regulatory-aligned country credit risk framework using macroeconomic data from 1999 Q1 to 2022 Q4."),
    bullet("Used MICE imputation, multi-factor models, Monte Carlo simulation, lagged indicators, and Merton-inspired calibration."),
    Paragraph("Independent & Academic Work", styles["Role"]),
    bullet("Feng Shui Home Recommendation - AI-assisted matching, product design, Next.js, UX design, and Figma."),
    bullet("UK Inflation Sentiment Analysis - BERT and ARIMAX workflow for inflation expectation forecasting."),
    bullet("Pine Wilt Disease Identification - Faster R-CNN and YOLO drone-image recognition system; 98% accuracy."),
    Paragraph("CAPABILITIES", styles["Section"]),
    Paragraph("<b>AI Product:</b> AI agents, workflow orchestration, knowledge bases, prompt strategy, tool calling, state machines, observability", styles["BodySmall"]),
    Paragraph("<b>Risk Strategy:</b> acquisition screening, credit approval, risk pricing, customer segmentation, gray launch, monitoring, decision rules", styles["BodySmall"]),
    Paragraph("<b>Data & Modeling:</b> Python, SQL, feature engineering, Random Forest, XGBoost, regression, Monte Carlo simulation, model evaluation, KS/AUC", styles["BodySmall"]),
    Paragraph("<b>Product Delivery:</b> user scenarios, PRDs, prototyping, UAT, cross-functional coordination, launch planning, iteration, result monitoring", styles["BodySmall"]),
    Paragraph("<b>Research & Analytics:</b> NLP, BERT, ARIMAX, time series, stress testing, macroeconomic analysis, data visualization", styles["BodySmall"]),
    Paragraph("EDUCATION", styles["Section"]),
    Paragraph("King's College London", styles["Role"]),
    Paragraph("MSc, Big Data in Culture and Society  |  Sep 2022 - Dec 2023  |  London", styles["Meta"]),
]

doc = SimpleDocTemplate(str(OUTPUT), pagesize=A4, leftMargin=18 * mm, rightMargin=18 * mm, topMargin=15 * mm, bottomMargin=18 * mm, title="Jiaying Jin Resume", author="Jiaying Jin")
doc.build(story, onFirstPage=footer, onLaterPages=footer)
print(OUTPUT)
