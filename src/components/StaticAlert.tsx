import { Alert } from "react-bootstrap"

type Props = {
  variant?: string
  alertText: string
}

const StaticAlert = ({ variant, alertText }: Props) => {
  return <Alert variant={variant || "info"}>{alertText}</Alert>
}

export default StaticAlert
