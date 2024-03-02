// npm run dev
// ngrok http --domain=impala-measured-rapidly.ngrok-free.app 3000

// We cannot resolve a promise or use async await in a client component
// Suspense only works in main layout file , does not work with individual Component file


// Livekit Packages
=> npm i livekit-client
=> npm i @livekit/components-react
=> npm i livekit-server-sdk









































model User {
  id             String    @id @default(uuid())
  username       String    @unique
  imageUrl       String    @db.Text
  email          String
  bio            String?
  externalUserId String    @unique
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt

  followers      Follow[]  @relation("UserFollowers")
  following      Follow[]  @relation("UserFollowing")
}

model Follow {
  id          String  @id @default(uuid())


  followerId  String
  followingId String

  follower    User    @relation("UserFollowers", fields: [followerId], references: [id])
  following   User    @relation("UserFollowing", fields: [followingId], references: [id])
  
  @@unique([followerId, followingId])
}
