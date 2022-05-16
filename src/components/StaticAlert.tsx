import { Alert } from "react-bootstrap"

type Props = {
  variant?: string
  alertText: string
}

const StaticAlert = ({ variant = "info", alertText }: Props) => {
  return <Alert variant={variant}>{alertText}</Alert>
}

export default StaticAlert
