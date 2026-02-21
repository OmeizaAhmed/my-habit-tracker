import ProtectedHeader from "@/components/protected-header";

export default function LogLayout({children}: {children: React.ReactNode}){

  return(
    <main>
      <ProtectedHeader/>
      {children}
    </main>
  )
}