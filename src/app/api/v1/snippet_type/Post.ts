import {NextRequest, NextResponse} from 'next/server';

interface Data {
  message: string;
}

const PostHandler = async (req: NextRequest) => {
  const body = await req.json();

  return NextResponse.json<Data>({
    message: `From Post Handler ${JSON.stringify(body)}`,
  });
};

export default PostHandler;
