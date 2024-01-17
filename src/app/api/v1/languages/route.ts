import {NextRequest, NextResponse} from 'next/server';

import GetHandler from './Get';
import PostHandler from './Post';
// import PatchHandler from "./Patch";
// import PutHandler from "./Put";
// import DeleteHandler from "./Delete";
// import HeadHandler from "./Head";
// import OptionsHandler from "./Options";

export async function GET(req: NextRequest) {
  return GetHandler(req);
}
export async function POST(req: NextRequest) {
  return GetHandler(req);
}
// export async function PATCH (req: NextRequest) {PatchHandler(req)};
// export async function PUT (req: NextRequest) {PutHandler(req)};
// export async function DELETE (req: NextRequest) {DeleteHandler(req)};
// export async function HEAD (req: NextRequest) {HeadHandler(req)};
// export async function OPTIONS (req: NextRequest) {OptionsHandler(req)};
